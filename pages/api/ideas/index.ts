import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { connectToDatabase } from "../../../utils/mongodb";
import { IdeaModel } from "../../../models/Idea";

connectToDatabase();

const secret = process.env.JWT_SECRET as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

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
      if (session) {
        try {
          const newIdea = await IdeaModel.create(req.body);

          res.status(201).json({ success: true, data: newIdea });
        } catch (error) {
          res.status(400).json({ success: false });
        }
      } else {
        res.status(401).end("You must be logged in to do that");
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
