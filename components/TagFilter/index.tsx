"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useUserDataState from "@/stores/userDataStore";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function TagFilter() {
  const { userTags, filteredTags, userNotes, setFilteredTags } =
    useUserDataState();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"sm"}>
          Filter tags
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select tags</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userTags.map((elem) => {
          return (
            <DropdownMenuCheckboxItem
              key={elem}
              checked={filteredTags.includes(elem)}
              onCheckedChange={() => setFilteredTags(elem)}
            >
              {elem}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
