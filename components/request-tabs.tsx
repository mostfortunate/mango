"use client";

import { useTheme } from "next-themes";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import JSONEditor from "@/components/json-editor";
import { ClipboardPaste, Trash2, Trash } from "lucide-react";
import { IconAlertTriangle } from "@tabler/icons-react";

import { HTTPMethod } from "@/app/types/http";

interface QueryParam {
  key: string;
  value: string;
}

interface Header {
  key: string;
  value: string;
}

interface RequestTabsProps {
  method: HTTPMethod;
  queryParams: QueryParam[];
  updateQueryParam: (index: number, updates: Partial<QueryParam>) => void;
  deleteQueryParam: (index: number) => void;
  setQueryParams: (params: QueryParam[]) => void;
  headers: Header[];
  updateHeader: (index: number, updates: Partial<Header>) => void;
  deleteHeader: (index: number) => void;
  setHeaders: (headers: Header[]) => void;
  requestBody: string;
  onRequestBodyChange: (body: string) => void;
}

interface AlertMessageProps {
  text: string;
}

interface DeleteButtonProps {
  onClick: () => void;
}

const AlertMessage = ({ text }: AlertMessageProps) => {
  const { theme } = useTheme();
  return (
    <div className="text-muted-foreground flex flex-row items-center gap-2 rounded-sm border-2 border-yellow-300/70 bg-amber-400/10 p-4">
      <IconAlertTriangle color={theme === "dark" ? "#cc9602" : "#fcba03"} />
      {text}
    </div>
  );
};

const DeleteButton = ({ onClick }: DeleteButtonProps) => (
  <Button variant="destructive" size="icon" onClick={onClick}>
    <Trash />
  </Button>
);

const RequestTabs = ({
  method,
  queryParams,
  updateQueryParam,
  deleteQueryParam,
  setQueryParams,
  headers,
  updateHeader,
  deleteHeader,
  setHeaders,
  requestBody,
  onRequestBodyChange,
}: RequestTabsProps) => {
  const ignoreJSON = method == "GET";
  const requestTabs = ["Params", "Headers", "JSON"];

  return (
    <Tabs defaultValue={requestTabs[0]} className="w-full">
      <TabsList variant="line" className="mb-4">
        {requestTabs.map((tab) => (
          <TabsTrigger key={tab} value={tab}>
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="Params">
        <Card>
          <CardHeader>
            <CardTitle>Query Parameters</CardTitle>
            <CardDescription>
              Add, edit, or remove query parameters for your request.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {queryParams.map((param, index) => (
              <div key={index} className="flex flex-row items-center gap-2">
                <Input
                  placeholder="Key"
                  value={param.key}
                  onChange={(e) =>
                    updateQueryParam(index, { key: e.target.value })
                  }
                />
                <Input
                  placeholder="Value"
                  value={param.value}
                  onChange={(e) =>
                    updateQueryParam(index, { value: e.target.value })
                  }
                />
                <DeleteButton onClick={() => deleteQueryParam(index)} />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <CardAction className="w-full">
              <Button
                size="sm"
                onClick={() =>
                  setQueryParams([...queryParams, { key: "", value: "" }])
                }
              >
                Add
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="Headers">
        <Card>
          <CardHeader>
            <CardTitle>Headers</CardTitle>
            <CardDescription>
              Add, edit, or remove headers for your request.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {headers.map((header, index) => (
              <div key={index} className="flex flex-row items-center gap-2">
                <Input
                  placeholder="Key"
                  value={header.key}
                  onChange={(e) => updateHeader(index, { key: e.target.value })}
                />
                <Input
                  placeholder="Value"
                  value={header.value}
                  onChange={(e) =>
                    updateHeader(index, { value: e.target.value })
                  }
                />
                <DeleteButton onClick={() => deleteHeader(index)} />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <CardAction className="w-full">
              <Button
                size="sm"
                onClick={() => setHeaders([...headers, { key: "", value: "" }])}
              >
                Add
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="JSON">
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <div className="flex flex-col gap-3">
              <CardTitle>Request Body</CardTitle>
              <CardDescription>
                {ignoreJSON ? (
                  <AlertMessage text="Request body will not be sent for GET requests." />
                ) : (
                  "Edit the JSON request body."
                )}
              </CardDescription>
            </div>
            <div className="flex flex-row gap-2">
              <CardAction>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon-xs"
                      aria-label="Paste request body"
                    >
                      <ClipboardPaste />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Paste</p>
                  </TooltipContent>
                </Tooltip>
              </CardAction>
              <CardAction>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon-xs"
                      aria-label="Remove request body"
                    >
                      <Trash2 />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Clear</p>
                  </TooltipContent>
                </Tooltip>
              </CardAction>
            </div>
          </CardHeader>
          <CardContent>
            <JSONEditor value={requestBody} onChange={onRequestBodyChange} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default RequestTabs;
