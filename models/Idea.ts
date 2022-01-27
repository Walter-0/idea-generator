const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema(
  {
    appName: {
      type: String,
      required: true,
    },
    noun: {
      type: String,
      required: true,
    },
    likes: [mongoose.ObjectId],
  },
  { timestamps: true }
);

// TODO: Add instance method to check for existing appName/noun combo to prevent duplicates

export const Idea = mongoose.models.Idea || mongoose.model("Idea", IdeaSchema);
