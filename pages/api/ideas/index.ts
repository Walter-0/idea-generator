import type { NextApiRequest, NextApiResponse } from "next";
import { IdeaModel } from "../../../models/Idea";
import { connectToDatabase } from "../../../utils/mongodb";

connectToDatabase();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    /** Get all Ideas */
    case "GET":
      try {
        // TODO: Sort by number of likes
        const ideas = await IdeaModel.find({});

        res.status(200).json(ideas);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    /** Save Idea to database */
    case "POST":
      try {
        const newIdea = await IdeaModel.create(req.body);

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
