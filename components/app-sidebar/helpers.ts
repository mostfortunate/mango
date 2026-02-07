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

export const resolveDefaultEndpointId = (
  collection: Collection,
  lastSelectedEndpointId: string | null,
): string | null => {
  if (!collection.endpoints.length) {
    return null;
  }

  const lastSelectedInCollection = collection.endpoints.find(
    (endpoint) => endpoint.id === lastSelectedEndpointId,
  );

  return lastSelectedInCollection?.id ?? collection.endpoints[0]?.id ?? null;
};

export const getNextCollectionName = (collections: Collection[]): string => {
  const baseName = "New Collection";
  const namePattern = new RegExp(`^${baseName}(?: (\\d+))?$`);
  const existingSuffixes = collections
    .map((collection) => collection.name.match(namePattern))
    .filter((match): match is RegExpMatchArray => match !== null)
    .map((match) => Number(match[1] ?? 1));
  const nextSuffix =
    existingSuffixes.length > 0 ? Math.max(...existingSuffixes) + 1 : 1;

  return nextSuffix === 1 ? baseName : `${baseName} ${nextSuffix}`;
};
