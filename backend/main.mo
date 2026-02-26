import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Nat "mo:core/Nat";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Migration "migration";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

// Specify the data migration function in with-clause
(with migration = Migration.run)
actor {
  type Address = {
    street : Text;
    number : Nat;
    city : Text;
    postalCode : Text;
  };

  type QueryForm = {
    name : Text;
    phone : Text;
    email : Text;
    serviceType : Text;
    message : Text;
  };

  type EstimateResponse = {
    estimatedCost : Nat;
    breakdown : Text;
  };

  type CalculatorLead = {
    name : Text;
    mobile : Text;
    projectType : Text;
    areaInSqFt : Float;
    numFloors : Nat;
    qualityTier : Text;
    address : Address;
  };

  type UserProfile = {
    name : Text;
    email : Text;
  };

  // Authorization state and mixin
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let queryForms = List.empty<QueryForm>();
  let calculatorLeads = List.empty<CalculatorLead>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Quality tier rates (strictly backend only — never exposed to frontend)
  let STANDARD_RATE = 1350.0;
  let PREMIUM_RATE = 1450.0;
  let LUXURY_RATE = 1550.0;

  // ── User Profile Functions ─────────────────────────────────────────────────-
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ── Query Form Functions ─────────────────────────────────────────────────-
  // Any caller (including guests) may submit a query form
  public shared ({ caller }) func submitQueryForm(
    name : Text,
    phone : Text,
    email : Text,
    serviceType : Text,
    message : Text,
  ) : async () {
    let queryForm = { name; phone; email; serviceType; message };
    queryForms.add(queryForm);
  };

  // Admin-only: list all submitted query forms
  public query ({ caller }) func getAllQueryForms() : async [QueryForm] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all query forms");
    };
    queryForms.toArray();
  };

  // ── Estimate Calculator and Leads ─────────────────────────────────────────
  // Any caller (including guests) may request a cost estimate.
  // Quality tier rates are used internally and are NOT included in the response.
  public shared ({ caller }) func calculateEstimate(
    name : Text,
    mobile : Text,
    projectType : Text,
    areaInSqFt : Float,
    numFloors : Nat,
    qualityTier : Text,
    street : Text,
    number : Nat,
    city : Text,
    postalCode : Text,
  ) : async EstimateResponse {
    let qualityFactor : Float = switch (qualityTier) {
      case ("Standard") { STANDARD_RATE };
      case ("Premium") { PREMIUM_RATE };
      case ("Luxury") { LUXURY_RATE };
      case (_) { STANDARD_RATE };
    };

    let address = { street; number; city; postalCode };

    let floorsFloat : Float = numFloors.toFloat();
    let totalCost : Float = areaInSqFt * floorsFloat * qualityFactor;
    let estimatedCostNat : Nat = totalCost.toInt() |> (if (_ < 0) 0 else Int.toNat(_));

    // Store calculator lead with new fields
    let lead = {
      name;
      mobile;
      projectType;
      areaInSqFt;
      numFloors;
      qualityTier;
      address;
    };
    calculatorLeads.add(lead);

    // Breakdown intentionally omits per-unit rates to keep them backend-only
    let breakdown : Text = "Project: " # projectType
    # " | Area: "
    # areaInSqFt.toText()
    # " sq ft"
    # " | Floors: "
    # numFloors.toText()
    # " | Quality: "
    # qualityTier
    # " | Location: "
    # city
    # " | Total: Rs "
    # estimatedCostNat.toText();

    { estimatedCost = estimatedCostNat; breakdown };
  };

  // Admin-only: list all calculator leads
  public query ({ caller }) func getAllCalculatorLeads() : async [CalculatorLead] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all calculator leads");
    };
    calculatorLeads.toArray();
  };
};
