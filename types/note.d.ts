import { UUID } from "crypto";

export default interface NoteProps {
  id?: string;
  title: string;
  description?: string;
  createDate: Date;
  lastEditDate?: Date;
  tags?: string[] | [string] | [];
  favorite: boolean;
}
