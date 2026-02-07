"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-background/80 border-b backdrop-blur">
      <div className="flex flex-row items-center justify-between p-2">
        <SidebarTrigger aria-label="Toggle sidebar">
          <Menu className="size-4" />
        </SidebarTrigger>
        <div className="text-primary mr-auto ml-auto text-center text-4xl font-black font-serif italic">
          Via
        </div>
      </div>
    </header>
  );
}
