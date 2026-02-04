import { type HTTPMethod } from "@/app/types/http";
import { type HistoryItem } from "@/app/types/models";

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

export interface RequestHistoryRowProps {
  item: HistoryItem;
  theme: "light" | "dark";
}

export const RequestHistoryRow = ({ item, theme }: RequestHistoryRowProps) => {
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
