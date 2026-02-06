import { useState } from "react";
import { type Collection, type CollectionEndpoint } from "@/app/types/models";

export type UseCollectionsResult = {
  collections: Collection[];
  activeEndpointId: string | null;
  selectEndpoint: (endpointId: string) => void;
  getEndpointById: (endpointId: string) => CollectionEndpoint | null;
};

export function useCollections(
  initialCollections: Collection[] = [],
): UseCollectionsResult {
  const [collections] = useState<Collection[]>(initialCollections);
  const [activeEndpointId, setActiveEndpointId] = useState<string | null>(null);

  const endpointLookup = () => {
    const map = new Map<string, CollectionEndpoint>();
    collections.forEach((collection) => {
      collection.endpoints.forEach((endpoint) => {
        map.set(endpoint.id, endpoint);
      });
    });
    return map;
  };

  const selectEndpoint = (endpointId: string) => {
    setActiveEndpointId(endpointId);
  };

  const getEndpointById = (endpointId: string) =>
    endpointLookup().get(endpointId) ?? null;

  return {
    collections,
    activeEndpointId,
    selectEndpoint,
    getEndpointById,
  };
}
