import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

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

  type ContactForm = {
    name : Text;
    phone : Text;
    email : Text;
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

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let queryForms = List.empty<QueryForm>();
  let contactForms = List.empty<ContactForm>();
  let calculatorLeads = List.empty<CalculatorLead>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let STANDARD_RATE = 1350.0;
  let PREMIUM_RATE = 1450.0;
  let LUXURY_RATE = 1550.0;

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
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
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared func submitQueryForm(
    name : Text,
    phone : Text,
    email : Text,
    serviceType : Text,
    message : Text,
  ) : async () {
    let queryForm = { name; phone; email; serviceType; message };
    queryForms.add(queryForm);
  };

  public query func getAllQueryForms() : async [QueryForm] {
    queryForms.toArray();
  };

  public shared func submitContactForm(
    name : Text,
    phone : Text,
    email : Text,
    message : Text,
  ) : async () {
    let contactForm = { name; phone; email; message };
    contactForms.add(contactForm);
  };

  public query func getAllContactForms() : async [ContactForm] {
    contactForms.toArray();
  };

  public shared func calculateEstimate(
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
    let qualityFactor = switch (qualityTier) {
      case ("Standard") { STANDARD_RATE };
      case ("Premium") { PREMIUM_RATE };
      case ("Luxury") { LUXURY_RATE };
      case (_) { STANDARD_RATE };
    };

    let address = { street; number; city; postalCode };
    let floorsFloat = numFloors.toFloat();
    let totalCost = areaInSqFt * floorsFloat * qualityFactor;
    let estimatedCostNat = if (totalCost.toInt() < 0) {
      0;
    } else {
      totalCost.toInt().toNat();
    };

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

    let breakdown = "Project: " # projectType
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

  public query func getAllCalculatorLeads() : async [CalculatorLead] {
    calculatorLeads.toArray();
  };
};
