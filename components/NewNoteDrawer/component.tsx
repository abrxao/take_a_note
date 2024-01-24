"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PlusIcon } from "@radix-ui/react-icons";
import useNoteDrawerState from "@/stores/noteModalStore";
import FormNote from "../FormNote";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function NewNoteDrawer_() {
  const { isDrawerNoteOpen, setIsDrawerNoteOpen, clearEditNote } =
    useNoteDrawerState();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isDrawerNoteOpen} onOpenChange={setIsDrawerNoteOpen}>
        <DialogTrigger onClick={() => clearEditNote()} asChild>
          <Button onClick={() => {}} data-testid="newnotedrawer-button-desktop">
            New note <PlusIcon className="ml-1" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <FormNote />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isDrawerNoteOpen} onOpenChange={setIsDrawerNoteOpen}>
      <DrawerTrigger asChild>
        <Button size="sm" data-testid="newnotedrawer-button-mobile">
          New note <PlusIcon className="ml-1" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <FormNote className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
