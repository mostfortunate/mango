"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const theme = resolvedTheme ?? "light";

  return theme === "dark" ? (
    <Button size="icon" onClick={() => setTheme("light")}>
      <Moon />
    </Button>
  ) : (
    <Button size="icon" onClick={() => setTheme("dark")}>
      <Sun />
    </Button>
  );
}
