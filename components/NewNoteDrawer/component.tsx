"use client";
import * as React from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import useNoteDrawerState from "@/stores/noteModalStore";
import FormNote from "../FormNote";

export default function NewNoteDrawer_() {
  const { isDrawerNoteOpen, setIsDrawerNoteOpen, clearEditNote } =
    useNoteDrawerState();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isDrawerNoteOpen} onOpenChange={setIsDrawerNoteOpen}>
        <DialogTrigger onClick={() => clearEditNote()} asChild>
          <Button variant="secondary" onClick={() => {}}>
            New note <PlusCircledIcon className="ml-1" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <FormNote />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isDrawerNoteOpen} onOpenChange={setIsDrawerNoteOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary" size="sm">
          New note <PlusCircledIcon className="ml-1" />
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
