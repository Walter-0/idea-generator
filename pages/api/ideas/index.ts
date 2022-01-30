import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { IdeaModel } from "../../../models/Idea";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  switch (req.method) {
    /** Get all Ideas */
    case "GET":
      try {
        const ideas = await IdeaModel.find().sort({ likesLength: -1 });

        return res.status(200).json(ideas);
      } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false });
      }

    /** Save Idea to database */
    case "POST":
      if (session) {
      try {
        const newIdea = await IdeaModel.create(req.body);

        return res.status(201).json(newIdea);
      } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false });
      }
    } else {
      return res.status(401).end("You must be logged in to do that");
    }

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
