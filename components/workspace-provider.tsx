"use client";

import { createContext, useContext } from "react";

import { type Collection } from "@/app/types/models";
import { useCollections } from "@/hooks/use-collections";
import {
  useRequestDraft,
  type RequestDraft,
  type RequestDraftActions,
} from "@/hooks/use-request-draft";

export type WorkspaceContextValue = {
  collections: Collection[];
  activeEndpointId: string | null;
  draft: RequestDraft;
  draftActions: Omit<RequestDraftActions, "draft">;
  selectEndpoint: (endpointId: string) => void;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export type WorkspaceProviderProps = {
  initialCollections: Collection[];
  children: React.ReactNode;
};

export function WorkspaceProvider({
  initialCollections,
  children,
}: WorkspaceProviderProps) {
  const {
    collections,
    activeEndpointId,
    selectEndpoint: selectEndpointBase,
    getEndpointById,
  } = useCollections(initialCollections);

  const {
    draft,
    setMethod,
    setUrl,
    updateQueryParam,
    deleteQueryParam,
    setQueryParams,
    updateHeader,
    deleteHeader,
    setHeaders,
    setBody,
    loadFromEndpoint,
    reset,
  } = useRequestDraft();

  const selectEndpoint = (endpointId: string) => {
    selectEndpointBase(endpointId);
    const endpoint = getEndpointById(endpointId);
    if (!endpoint) return;
    
    loadFromEndpoint(endpoint.method, endpoint.url);
  };

  const draftActions = {
    setMethod,
    setUrl,
    updateQueryParam,
    deleteQueryParam,
    setQueryParams,
    updateHeader,
    deleteHeader,
    setHeaders,
    setBody,
    loadFromEndpoint,
    reset,
  };

  const value = {
    collections,
    activeEndpointId,
    selectEndpoint,
    draft,
    draftActions,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within WorkspaceProvider");
  }
  return context;
}
