"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import TagsArea from "./TagsArea";
import AddTagsInput from "./AddTagsInput";
import useUserDataState from "@/stores/userDataStore";
import { X } from "lucide-react";
import axios from "axios";
import NoteProps from "@/types/note";

const createNoteSchema = z.object({
  title: z.string().min(1, "Coloque um título."),
  description: z.string().min(1, "Coloque uma descrição."),
});

type CreateLoginData = z.infer<typeof createNoteSchema>;

export default function ProfileForm({
  className,
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLoginData>({
    resolver: zodResolver(createNoteSchema),
  });
  const { userTags, addNoteOnStore } = useUserDataState();
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState({
    value: "",
    error: "",
  });

  async function addUserNote(data: CreateLoginData) {
    const { title, description } = data;
    const dateNow = new Date();

    try {
      const postJson: NoteProps = {
        title,
        description,
        tags,
        createDate: dateNow,
        favorite: true,
      };

      addNoteOnStore(postJson);
      reset();
      setTags([]);
    } catch (e) {}
  }

  return (
    <form
      onSubmit={handleSubmit(addUserNote)}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          data-testid="title-input-note"
          register={register("title")}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          data-testid="description-input-note"
          register={register("description")}
        />
      </div>
      <AddTagsInput
        tags={userTags.filter((userTag) => !tags.includes(userTag))}
        inputValue={currentTag.value}
        inputOnChange={(e) =>
          setCurrentTag({ value: e.target.value, error: "" })
        }
        clickOnTagAction={(e) => {
          var aux = tags;
          /* @ts-ignore */
          aux.push(e.target.value);
          setTags(aux);
          setCurrentTag({
            value: "",
            error: "",
          });
        }}
        addButtonAction={(e) => {
          if (currentTag.value) {
            var aux = tags;
            aux.push(currentTag.value);
            setTags(aux);
            setCurrentTag({
              value: "",
              error: "",
            });
          } else {
            setCurrentTag({
              value: "",
              error: "Coloque um valor valido",
            });
          }
        }}
      />
      <TagsArea
        tags={tags}
        Icon={<X size={14} />}
        clickAction={(e) => {
          /* @ts-ignore */
          const aux = tags.filter((tag) => tag != e.target.value);
          setTags(aux);
          console.log(tags);
        }}
      />
      <Button>Save changes</Button>
    </form>
  );
}
