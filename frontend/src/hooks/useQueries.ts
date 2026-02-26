import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { QueryForm, CalculatorLead, ContactForm, UserProfile, EstimateResponse } from '../backend';

// ── User Profile ─────────────────────────────────────────────────────────────

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
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// ── Admin Role Check ──────────────────────────────────────────────────────────

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
  });
}

// ── Query Forms ───────────────────────────────────────────────────────────────

export function useSubmitQueryForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: {
      name: string;
      phone: string;
      email: string;
      serviceType: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitQueryForm(form.name, form.phone, form.email, form.serviceType, form.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['queryForms'] });
    },
  });
}

export function useGetAllQueryForms(enabled: boolean = true) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<QueryForm[]>({
    queryKey: ['queryForms'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllQueryForms();
    },
    enabled: enabled && !!actor && !actorFetching,
    retry: false,
  });
}

// ── Contact Form ──────────────────────────────────────────────────────────────

export function useSubmitContactForm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: {
      name: string;
      phone: string;
      email: string;
      serviceType: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      // Contact form uses submitQueryForm since it captures serviceType too
      return actor.submitQueryForm(form.name, form.phone, form.email, form.serviceType, form.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactForms'] });
      queryClient.invalidateQueries({ queryKey: ['queryForms'] });
    },
  });
}

export function useGetAllContactForms(enabled: boolean = true) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ContactForm[]>({
    queryKey: ['contactForms'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllContactForms();
    },
    enabled: enabled && !!actor && !actorFetching,
    retry: false,
  });
}

// ── Calculator Leads ──────────────────────────────────────────────────────────

export function useCalculateEstimate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
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
    }): Promise<EstimateResponse> => {
      if (!actor) throw new Error('Actor not available');
      return actor.calculateEstimate(
        params.name,
        params.mobile,
        params.projectType,
        params.areaInSqFt,
        params.numFloors,
        params.qualityTier,
        params.street,
        params.number,
        params.city,
        params.postalCode,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calculatorLeads'] });
    },
  });
}

export function useGetAllCalculatorLeads(enabled: boolean = true) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<CalculatorLead[]>({
    queryKey: ['calculatorLeads'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllCalculatorLeads();
    },
    enabled: enabled && !!actor && !actorFetching,
    retry: false,
  });
}
