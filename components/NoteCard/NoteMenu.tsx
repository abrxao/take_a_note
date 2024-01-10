/* import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { DrawingPinIcon, GearIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

export default function NoteMenu() {
  return (
    <Menubar className="p-0 py-0 bg-transparent dark:bg-transparent outline-none border-none dark:border-none">
      <MenubarMenu>
        <Button variant="ghost" size={"xsm"}>
          <DrawingPinIcon />
        </Button>
      </MenubarMenu>
      <MenubarMenu>
        <Button variant="ghost" size={"xsm"}>
          <GearIcon />
        </Button>
      </MenubarMenu>
    </Menubar>
    
  );
}
 */

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DrawingPinIcon, GearIcon } from "@radix-ui/react-icons";

export default function NodeMenu() {
  return (
    <ToggleGroup size="xsm" type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle pinned note">
        <DrawingPinIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="More options">
        <GearIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
