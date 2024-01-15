"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Settings } from "lucide-react";

export default function ModeToggleButton() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle theme</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          data-selected={theme == "light"}
          onClick={() => {
            setTheme("light");
          }}
          className="flex justify-between cursor-pointer data-[selected=true]:bg-cyan-100"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          data-selected={theme == "dark"}
          onClick={() => setTheme("dark")}
          className="flex justify-between cursor-pointer data-[selected=true]:bg-slate-500"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          data-selected={theme == "system"}
          onClick={() => setTheme("system")}
          className="flex justify-between cursor-pointer dark:data-[selected=true]:bg-slate-500 data-[selected=true]:bg-cyan-200"
        >
          System <Settings size={14} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
