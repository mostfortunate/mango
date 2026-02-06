"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useHttpRequest } from "@/hooks/use-http-request";
import { useRequestHistory } from "@/hooks/use-request-history";
import { getStatusText } from "@/lib/utils";
import { useWorkspace } from "@/components/workspace-provider";

import { MOCK_HISTORY } from "@/mocks/request-history";

import { type AxiosResponse } from "axios";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import RequestForm from "@/components/home/request-form";
import RequestTabs from "@/components/home/request-tabs";
import ResponseTabs from "@/components/home/response-tabs";

const USE_MOCK_DATA = false;

export default function Home() {
  const { draft, draftActions, autofillExistingUrl, setAutofillExistingUrl } =
    useWorkspace();
  const {
    setMethod,
    setUrl,
    updateQueryParam,
    deleteQueryParam,
    setQueryParams,
    updateHeader,
    deleteHeader,
    setHeaders,
    setBody,
  } = draftActions;

  const [responseBody, setResponseBody] = useState<string>("");
  const [response, setResponse] = useState<AxiosResponse | null>(null);

  function updateEndTime(response: AxiosResponse): AxiosResponse {
    response.customData = response.customData || {};
    response.customData.time =
      new Date().getTime() - response.config.customData.startTime;
    return response;
  }

  const { history: requestHistory, addFromResponse } = useRequestHistory(
    USE_MOCK_DATA ? MOCK_HISTORY : [],
  );

  const { sendRequest } = useHttpRequest({
    url: draft.url,
    method: draft.method,
    queryParams: draft.queryParams,
    headers: draft.headers,
    requestBody: draft.body,
    setResponse,
    setResponseBody,
    addFromResponse,
    updateEndTime,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        sendRequest();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sendRequest]);

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <RequestForm
          url={draft.url}
          method={draft.method}
          requestHistory={requestHistory}
          setMethod={setMethod}
          setUrl={setUrl}
          autofillExistingUrl={autofillExistingUrl}
          onAutofillExistingUrlChange={setAutofillExistingUrl}
          onSend={sendRequest}
        />
        <RequestTabs
          method={draft.method}
          queryParams={draft.queryParams}
          updateQueryParam={updateQueryParam}
          deleteQueryParam={deleteQueryParam}
          setQueryParams={setQueryParams}
          headers={draft.headers}
          updateHeader={updateHeader}
          deleteHeader={deleteHeader}
          setHeaders={setHeaders}
          requestBody={draft.body}
          onRequestBodyChange={setBody}
        />
        {response && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ResponseTabs
              response={response}
              responseBody={responseBody}
              getStatusText={getStatusText}
            />
          </motion.div>
        )}
        <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <KbdGroup>
                <Kbd>Ctrl or ⌘</Kbd>
                <span>+</span>
                <Kbd>B</Kbd>
              </KbdGroup>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle sidebar</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <KbdGroup>
                <Kbd>Ctrl or ⌘</Kbd>
                <span>+</span>
                <Kbd>↵</Kbd>
              </KbdGroup>
            </TooltipTrigger>
            <TooltipContent>
              <p>Send request</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </>
  );
}
