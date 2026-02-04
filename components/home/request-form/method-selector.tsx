import { type HTTPMethod } from "@/app/types/http";

import { InputGroupButton } from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export interface MethodSelectorProps {
  method: HTTPMethod;
  setMethod: (method: HTTPMethod) => void;
  theme: "light" | "dark";
}

export const MethodSelector = ({
  method,
  setMethod,
  theme,
}: MethodSelectorProps) => {
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
