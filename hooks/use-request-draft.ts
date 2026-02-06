import { useState } from "react";
import { type HTTPMethod } from "@/app/types/http";
import { type QueryParam, type Header } from "@/app/types/models";
import { updateKeyValueRows, deleteKeyValueRow } from "@/lib/utils";

export type RequestDraft = {
  method: HTTPMethod;
  url: string;
  queryParams: QueryParam[];
  headers: Header[];
  body: string;
};

export type RequestDraftActions = {
  draft: RequestDraft;
  setMethod: (method: HTTPMethod) => void;
  setUrl: (url: string) => void;
  updateQueryParam: (index: number, updates: Partial<QueryParam>) => void;
  deleteQueryParam: (index: number) => void;
  setQueryParams: (params: QueryParam[]) => void;
  updateHeader: (index: number, updates: Partial<Header>) => void;
  deleteHeader: (index: number) => void;
  setHeaders: (headers: Header[]) => void;
  setBody: (body: string) => void;
  loadFromEndpoint: (method: HTTPMethod, url: string) => void;
  reset: () => void;
};

const DEFAULT_DRAFT: RequestDraft = {
  method: "GET",
  url: "",
  queryParams: [],
  headers: [],
  body: "",
};

export function useRequestDraft(
  initial: RequestDraft = DEFAULT_DRAFT,
): RequestDraftActions {
  const [draft, setDraft] = useState<RequestDraft>(initial);

  const setMethod = (method: HTTPMethod) => {
    setDraft((prev) => ({ ...prev, method }));
  };

  const setUrl = (url: string) => {
    setDraft((prev) => ({ ...prev, url }));
  };

  const updateQueryParam = (index: number, updates: Partial<QueryParam>) => {
    setDraft((prev) => ({
      ...prev,
      queryParams: updateKeyValueRows(prev.queryParams, index, updates),
    }));
  };

  const deleteQueryParam = (index: number) => {
    setDraft((prev) => ({
      ...prev,
      queryParams: deleteKeyValueRow(prev.queryParams, index),
    }));
  };

  const setQueryParams = (params: QueryParam[]) => {
    setDraft((prev) => ({ ...prev, queryParams: params }));
  };

  const updateHeader = (index: number, updates: Partial<Header>) => {
    setDraft((prev) => ({
      ...prev,
      headers: updateKeyValueRows(prev.headers, index, updates),
    }));
  };

  const deleteHeader = (index: number) => {
    setDraft((prev) => ({
      ...prev,
      headers: deleteKeyValueRow(prev.headers, index),
    }));
  };

  const setHeaders = (headers: Header[]) => {
    setDraft((prev) => ({ ...prev, headers }));
  };

  const setBody = (body: string) => {
    setDraft((prev) => ({ ...prev, body }));
  };

  const loadFromEndpoint = (method: HTTPMethod, url: string) => {
    setDraft((prev) => ({
      ...prev,
      method,
      url,
    }));
  };

  const reset = () => {
    setDraft(DEFAULT_DRAFT);
  };

  return {
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
  };
}
