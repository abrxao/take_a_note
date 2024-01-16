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
import AddTagsInput from "./AddTagsInput";
import useUserDataState from "@/stores/userDataStore";
import { AlertTriangle, X } from "lucide-react";
import NoteProps from "@/types/note";
import useNoteDrawerState from "@/stores/noteModalStore";
import { toast } from "sonner";
import Tag from "../Tag";

const createNoteSchema = z.object({
  title: z.string().min(1, "Input a title for you note"),
  description: z.string(),
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
  const { userTags, addNoteOnStore, editNoteOnStore } = useUserDataState();
  const { editNote, clearEditNote, setIsDrawerNoteOpen } = useNoteDrawerState();
  const [tags, setTags] = useState<string[]>(editNote?.tags ?? []);
  const [currentTag, setCurrentTag] = useState({
    value: "",
    error: "",
  });

  async function addUserNote(data: CreateLoginData) {
    const { title, description } = data;

    try {
      var postJson: NoteProps = {
        title,
        description,
        tags,
        createDate: new Date(),
        favorite: false,
      };
      if (editNote != null) {
        postJson = {
          ...postJson,
          favorite: editNote.favorite,
          id: editNote.id,
          lastEditDate: new Date(),
        };
        editNoteOnStore(postJson);
      } else {
        addNoteOnStore(postJson);
      }

      reset();
      setTags([]);
    } catch (e) {
    } finally {
      if (editNote != null) {
        toast("Note edited");
        clearEditNote();
      } else {
        toast("Note created");
      }
      setIsDrawerNoteOpen(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(addUserNote)}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          aria-label="title input - required"
          defaultValue={editNote?.title ?? ""}
          type="text"
          id="title"
          data-testid="title-input-note"
          register={register("title")}
        />
        {errors.title?.message != undefined && (
          <p className="text-sm dark:text-red-400 flex gap-1 items-center text-red-600">
            {errors.title.message} <AlertTriangle size={14} />
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          defaultValue={editNote?.description ?? ""}
          data-testid="description-input-note"
          register={register("description")}
        />
        {errors.description?.message}
      </div>
      <AddTagsInput
        tags={userTags.filter((userTag) => !tags.includes(userTag))}
        inputValue={currentTag.value}
        inputOnChange={(e) =>
          setCurrentTag({ value: e.target.value, error: "" })
        }
        clickOnTagAction={(tag) => {
          var aux = tags;
          /* @ts-ignore */
          aux.push(tag);
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
      {
        <ul className={"flex flex-wrap items-start space-x-2"}>
          {tags.map((elem) => {
            return (
              <li key={elem}>
                <Tag
                  type="button"
                  value={elem}
                  aria-label="remove tag"
                  clickAction={() => {
                    // @ts-ignore
                    const aux = tags.filter((tag) => tag != elem);
                    setTags(aux);
                  }}
                >
                  {elem}
                  <X size={14} />
                </Tag>
              </li>
            );
          })}
        </ul>
      }
      <Button>Save changes</Button>
    </form>
  );
}
