import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Text "mo:core/Text";

module {
  // Old types
  type OldAddress = {
    street : Text;
    number : Nat;
    city : Text;
    postalCode : Text;
  };

  type OldContactForm = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  };

  type OldEstimateResponse = {
    estimatedCost : Nat;
    breakdown : Text;
  };

  type OldUserProfile = {
    name : Text;
    email : Text;
  };

  type OldActor = {
    contacts : Map.Map<Principal, OldContactForm>;
    userProfiles : Map.Map<Principal, OldUserProfile>;
  };

  // New types
  type NewAddress = {
    street : Text;
    number : Nat;
    city : Text;
    postalCode : Text;
  };

  type NewQueryForm = {
    name : Text;
    phone : Text;
    email : Text;
    serviceType : Text;
    message : Text;
  };

  type NewEstimateResponse = {
    estimatedCost : Nat;
    breakdown : Text;
  };

  type NewCalculatorLead = {
    name : Text;
    mobile : Text;
    projectType : Text;
    areaInSqFt : Float;
    numFloors : Nat;
    qualityTier : Text;
    address : NewAddress;
  };

  type NewUserProfile = {
    name : Text;
    email : Text;
  };

  type NewActor = {
    queryForms : List.List<NewQueryForm>;
    calculatorLeads : List.List<NewCalculatorLead>;
    userProfiles : Map.Map<Principal, NewUserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    {
      queryForms = List.empty<NewQueryForm>();
      calculatorLeads = List.empty<NewCalculatorLead>();
      userProfiles = old.userProfiles;
    };
  };
};
