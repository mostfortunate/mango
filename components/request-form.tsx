"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { type HTTPMethod } from "@/app/types/http";
import { type HistoryItem } from "@/app/types/models";
import { MOCK_HISTORY } from "@/mocks/request-history";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

import { History } from "lucide-react";

type MethodColor = {
  light: string;
  dark: string;
};

const HTTP_METHODS: Record<HTTPMethod, MethodColor> = {
  GET: { light: "text-blue-500", dark: "text-blue-500" },
  POST: { light: "text-green-600", dark: "text-green-500" },
  PATCH: { light: "text-green-500", dark: "text-green-300" },
  PUT: { light: "text-orange-500", dark: "text-orange-500" },
  DELETE: { light: "text-red-500", dark: "text-red-500" },
};

interface MethodSelectorProps {
  method: HTTPMethod;
  setMethod: (method: HTTPMethod) => void;
  theme: "light" | "dark";
}

const MethodSelector = ({ method, setMethod, theme }: MethodSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <InputGroupButton
          className={`font-mono ${HTTP_METHODS[method][theme]}`}
          variant="outline"
        >
          {method}
        </InputGroupButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-38">
        {Object.entries(HTTP_METHODS).map(([name, color]) => (
          <DropdownMenuCheckboxItem
            key={name}
            checked={method === name}
            onCheckedChange={() => setMethod(name as HTTPMethod)}
            className={`font-mono ${color[theme]}`}
          >
            {name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ActionsProps {
  isHistoryOpen: boolean;
  onToggleHistory: (isOpen: boolean) => void;
  onSend: () => void;
}

const Actions = ({ isHistoryOpen, onToggleHistory, onSend }: ActionsProps) => {
  return (
    <>
      <InputGroupButton
        className="bg-transparent"
        variant="secondary"
        onClick={() => onToggleHistory(!isHistoryOpen)}
        aria-haspopup="menu"
        aria-expanded={isHistoryOpen}
        aria-controls="request-history-menu"
      >
        <History />
        <span className="sr-only">Request History</span>
      </InputGroupButton>
      <InputGroupButton
        variant="default"
        className="text-primary-foreground px-4 font-semibold"
        onClick={onSend}
      >
        Send
      </InputGroupButton>
    </>
  );
};

interface AddressBarProps {
  url: string;
  onUrlChange: (url: string) => void;
}

const AddressBar = ({ url, onUrlChange }: AddressBarProps) => {
  return (
    <InputGroupInput
      id="inline-start-input"
      className="font-mono"
      type="url"
      placeholder="https://example.com"
      value={url}
      onChange={(e) => onUrlChange(e.target.value)}
    />
  );
};

interface RequestHistoryRowProps {
  item: HistoryItem;
  theme: "light" | "dark";
}

const RequestHistoryRow = ({ item, theme }: RequestHistoryRowProps) => {
  return (
    <>
      <div className="flex flex-1 items-center gap-3 font-mono">
        <span
          className={`flex w-12 justify-start font-mono text-xs font-semibold ${HTTP_METHODS[item.method as HTTPMethod][theme]}`}
        >
          {item.method}
        </span>
        <span className="text-left text-xs">{item.url}</span>
      </div>
      <div className="flex items-center gap-4 font-mono font-medium">
        <span className="text-muted-foreground text-left text-xs">
          {item.time}
        </span>
        <span
          className={`flex w-8 justify-center text-xs ${item.status === 200 ? "text-green-500" : "text-orange-500"}`}
        >
          {item.status}
        </span>
        <span className="text-muted-foreground w-32 text-left text-xs">
          {item.statusText}
        </span>
      </div>
    </>
  );
};

interface RequestFormProps {
  url: string;
  method: HTTPMethod;
  setUrl: (url: string) => void;
  setMethod: (method: HTTPMethod) => void;
  onSend: () => void;
}

const RequestForm = ({
  url,
  setUrl,
  method,
  setMethod,
  onSend,
}: RequestFormProps) => {
  const { resolvedTheme } = useTheme();
  const theme = (resolvedTheme ?? "light") as "light" | "dark";
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleHistoryItemClick = (historyItem: (typeof MOCK_HISTORY)[0]) => {
    setUrl(historyItem.url);
    setMethod(historyItem.method);
    setIsHistoryOpen(false);
  };

  return (
    <div className="relative">
      <InputGroup className={cn(isHistoryOpen && "rounded-b-none")}>
        <AddressBar url={url} onUrlChange={setUrl} />
        <InputGroupAddon align="inline-start">
          <MethodSelector method={method} setMethod={setMethod} theme={theme} />
        </InputGroupAddon>
        <InputGroupAddon className="gap-2" align="inline-end">
          <Actions
            isHistoryOpen={isHistoryOpen}
            onToggleHistory={setIsHistoryOpen}
            onSend={onSend}
          />
        </InputGroupAddon>
      </InputGroup>
      <div
        id="request-history-menu"
        role="menu"
        aria-label="Request History"
        className={cn(
          "bg-background absolute right-0 left-0 z-50 overflow-hidden rounded-b-md border border-t-0 shadow-lg transition-all duration-300 ease-in-out",
          isHistoryOpen
            ? "max-h-125 opacity-100"
            : "max-h-0 border-0 opacity-0",
        )}
      >
        <div>
          <div className="max-h-125 overflow-y-auto py-1">
            {MOCK_HISTORY.map((item, index) => (
              <button
                key={index}
                role="menuitem"
                onClick={() => handleHistoryItemClick(item)}
                className="hover:bg-accent flex w-full items-center justify-between rounded-sm px-3 py-1.5"
              >
                <RequestHistoryRow item={item} theme={theme} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
