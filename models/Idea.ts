import { Schema, model, models } from "mongoose";
import { Types } from "mongoose";

export interface IdeaDto {
  readonly appName: string;
  readonly noun: string;
}

export interface Idea extends IdeaDto {
  likes: Types.Array<string>;
}

const IdeaSchema = new Schema<Idea>(
  {
    appName: {
      type: String,
      required: true,
    },
    noun: {
      type: String,
      required: true,
    },
    likes: [String],
  },
  { timestamps: true }
);

// TODO: Add instance method to check for existing appName/noun combo to prevent duplicates

export const IdeaModel = models.Idea || model<Idea>("Idea", IdeaSchema);
