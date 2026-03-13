import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface QueryForm {
    serviceType: string;
    name: string;
    email: string;
    message: string;
    phone: string;
}
export interface CalculatorLead {
    qualityTier: string;
    projectType: string;
    name: string;
    address: Address;
    mobile: string;
    areaInSqFt: number;
    numFloors: bigint;
}
export interface ContactForm {
    name: string;
    email: string;
    message: string;
    phone: string;
}
export interface EstimateResponse {
    breakdown: string;
    estimatedCost: bigint;
}
export interface UserProfile {
    name: string;
    email: string;
}
export interface Address {
    street: string;
    city: string;
    postalCode: string;
    number: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    calculateEstimate(name: string, mobile: string, projectType: string, areaInSqFt: number, numFloors: bigint, qualityTier: string, street: string, number: bigint, city: string, postalCode: string): Promise<EstimateResponse>;
    getAllCalculatorLeads(): Promise<Array<CalculatorLead>>;
    getAllContactForms(): Promise<Array<ContactForm>>;
    getAllQueryForms(): Promise<Array<QueryForm>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactForm(name: string, phone: string, email: string, message: string): Promise<void>;
    submitQueryForm(name: string, phone: string, email: string, serviceType: string, message: string): Promise<void>;
}
