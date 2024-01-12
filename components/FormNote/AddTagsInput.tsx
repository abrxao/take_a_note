"use client";
import { ChangeEventHandler, MouseEventHandler, ReactNode } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import TagsArea from "./TagsArea";

interface AddTagsInput {
  tags: string[];
  addButtonAction?: MouseEventHandler<HTMLButtonElement>;
  inputOnChange?: ChangeEventHandler<HTMLInputElement>;
  inputValue?: string | number | readonly string[];
  clickOnTagAction?: MouseEventHandler<HTMLButtonElement>;
}

export default function AddTagsInput({
  tags,
  addButtonAction,
  inputOnChange,
  inputValue,
  clickOnTagAction,
}: AddTagsInput): ReactNode {
  return (
    <div className="grid gap-2">
      <Label htmlFor="addTags">Add tags</Label>

      <div>
        <p className="text-xs text-zinc-600 mt-1 dark:text-zinc-300">
          Your tags
        </p>
        <TagsArea
          tags={tags}
          Icon={<Plus size={14} />}
          clickAction={clickOnTagAction}
        />
      </div>
      <div className="relative">
        <Input
          id="addTags"
          placeholder="New Tag"
          onChange={inputOnChange}
          type="text"
          value={inputValue}
          className="my-0"
        />
        <Button
          type="button"
          className="absolute right-0 top-0"
          onClick={addButtonAction}
        >
          <Plus size={24} />
        </Button>
      </div>
    </div>
  );
}
