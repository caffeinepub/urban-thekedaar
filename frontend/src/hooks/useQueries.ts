import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { EstimateResponse, UserProfile, QueryForm, CalculatorLead } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// Contact form submission — maps to submitQueryForm with serviceType "General Inquiry"
export function useSubmitContactForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitQueryForm(
        data.name,
        data.phone,
        data.email,
        'General Inquiry',
        data.message
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allQueryForms'] });
    },
  });
}

// Returns all query forms — used by AdminInquiries for contact-style submissions
export function useGetAllContactForms() {
  const { actor, isFetching } = useActor();

  return useQuery<QueryForm[]>({
    queryKey: ['allQueryForms'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getAllQueryForms();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitQueryForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      email: string;
      serviceType: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitQueryForm(
        data.name,
        data.phone,
        data.email,
        data.serviceType,
        data.message
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allQueryForms'] });
    },
  });
}

export function useGetAllQueryForms() {
  const { actor, isFetching } = useActor();

  return useQuery<QueryForm[]>({
    queryKey: ['allQueryForms'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getAllQueryForms();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllCalculatorLeads() {
  const { actor, isFetching } = useActor();

  return useQuery<CalculatorLead[]>({
    queryKey: ['allCalculatorLeads'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getAllCalculatorLeads();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCalculateEstimate() {
  const { actor } = useActor();

  return useMutation<
    EstimateResponse,
    Error,
    {
      name: string;
      mobile: string;
      projectType: string;
      areaInSqFt: number;
      numFloors: bigint;
      qualityTier: string;
      street: string;
      number: bigint;
      city: string;
      postalCode: string;
    }
  >({
    mutationFn: async (data) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.calculateEstimate(
        data.name,
        data.mobile,
        data.projectType,
        data.areaInSqFt,
        data.numFloors,
        data.qualityTier,
        data.street,
        data.number,
        data.city,
        data.postalCode
      );
    },
  });
}
