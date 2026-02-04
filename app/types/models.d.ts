export type HistoryItem = {
    method: HTTPMethod;
    url: string;
    time: string;
    status: number;
    statusText: string;
};