import { type Collection } from "@/app/types/models";

type EndpointLookup = Map<string, { collectionId: string }>;

export const buildEndpointLookup = (
  collections: Collection[],
): EndpointLookup => {
  const lookup: EndpointLookup = new Map();

  collections.forEach((collection) => {
    collection.endpoints.forEach((endpoint) => {
      lookup.set(endpoint.id, { collectionId: collection.id });
    });
  });

  return lookup;
};

export const getDefaultExpandedCollectionIds = (
  collections: Collection[],
): Set<string> => {
  const firstCollection = collections[0];

  return firstCollection ? new Set([firstCollection.id]) : new Set<string>();
};
