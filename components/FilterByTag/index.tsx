"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUserDataState from "@/stores/userDataStore";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function TagFilter() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const { userTags, filteredTags, setFilteredTags } = useUserDataState();
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Filter tags</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select tags</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userTags.map((elem, index) => {
          return (
            <DropdownMenuCheckboxItem
              key={elem + index}
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
