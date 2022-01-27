import type { NextApiRequest, NextApiResponse } from "next";
import { Idea } from "../../../models/Idea";
import { connectToDatabase } from "../../../utils/mongodb";

connectToDatabase();

interface IdeaDto {
  readonly appName: string;
  readonly noun: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    /** Get all Ideas */
    case "GET":
      try {
        // TODO: Sort by number of likes
        const ideas = await Idea.find({});

        res.status(200).json({ success: true, data: ideas });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    /** Save Idea to database */
    case "POST":
      try {
        const newIdea = await Idea.create(req.body as IdeaDto);

        res.status(201).json({ success: true, data: newIdea });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
