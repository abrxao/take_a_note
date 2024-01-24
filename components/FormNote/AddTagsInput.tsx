"use client";
import { ChangeEventHandler, MouseEventHandler, ReactNode } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, PlusIcon } from "lucide-react";
import Tag from "../Tag";

interface AddTagsInput {
  tags: string[];
  addButtonAction?: MouseEventHandler<HTMLButtonElement>;
  inputOnChange?: ChangeEventHandler<HTMLInputElement>;
  inputValue?: string | number | readonly string[];
  clickOnTagAction?: (tag: string) => void;
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
        <ul className={"flex flex-wrap items-start space-x-2"}>
          {tags.map((elem) => {
            return (
              <li key={elem}>
                <Tag
                  type="button"
                  value={elem}
                  aria-label="remove tag"
                  clickAction={() => clickOnTagAction && clickOnTagAction(elem)}
                >
                  {elem}
                  <PlusIcon size={14} />
                </Tag>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="relative">
        <Input
          id="addTags"
          data-testid="input-add-tags"
          placeholder="New Tag"
          onChange={inputOnChange}
          type="text"
          value={inputValue}
          className="my-0"
        />
        <Button
          type="button"
          data-testid="input-add-tags-button"
          className="absolute right-0 top-0"
          onClick={addButtonAction}
        >
          <Plus size={24} />
        </Button>
      </div>
    </div>
  );
}
