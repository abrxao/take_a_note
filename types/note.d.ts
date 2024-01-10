import { UUID } from "crypto";

export default interface NoteProps {
  title: string;
  id: number;
  description?: string;
  createDate: Date;
  lastEditDate?: Date;
  tags?: [string] | [];
  favorite?: boolean;
}
