"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type QueryParam = {
  key: string;
  value: string;
};

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [method, setMethod] = useState<string>("GET");
  const [queryParams, setQueryParams] = useState<QueryParam[]>([]);
  const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
  const tabs = ["Query Params", "Headers", "JSON"];

  const updateQueryParam = (index: number, updates: Partial<QueryParam>) => {
    setQueryParams((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...updates };
      return next;
    });
  };

  const deleteQueryParam = (index: number) => {
    setQueryParams((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-row gap-4">
          <Select>
            <SelectTrigger className="font-semibold w-full max-w-48">
              <SelectValue placeholder={method} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {methods.map((m) => (
                  <SelectItem key={m} value={m} onSelect={() => setMethod(m)}>
                    {m}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            className="font-semibold"
            type="submit"
            onClick={() => console.log(url)}
          >
            Send
          </Button>
        </div>
        <Tabs defaultValue={tabs[0]} className="w-full">
          <TabsList variant="line" className="mb-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="Query Params">
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
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteQueryParam(index)}
                    >
                      Remove
                    </Button>
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
        </Tabs>
      </div>
    </>
  );
}
