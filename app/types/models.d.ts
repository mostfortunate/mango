export type CollectionEndpoint = {
  id: string;
  name: string;
  method: HTTPMethod;
  url: string;
}

export type Collection = {
  id: string;
  name: string;
  baseUrl: string;
  endpoints: CollectionEndpoint[];
};

export type HistoryItem = {
    method: HTTPMethod;
    url: string;
    time: number;
    status: number;
    statusText: string;
};

export type QueryParam = {
  key: string;
  value: string;
}

export type Header = {
  key: string;
  value: string;
}