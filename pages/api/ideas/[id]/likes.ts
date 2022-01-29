import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { IdeaModel } from "../../../../models/Idea";

const userId = "61f2c9a5185f662249248c06";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const { method, query } = req;

  switch (method) {
    /** Like Idea */
    case "PATCH":
      if (session) {
        try {
          const likedIdea = await IdeaModel.findByIdAndUpdate(
            query.id,
            {
              $addToSet: { likes: userId },
              $inc: { likesLength: 1 },
            },
            { new: true }
          );

          res.status(200).json({ success: true, data: likedIdea });
        } catch (error) {
          res.status(400).json({ success: false });
        }
      } else {
        res.status(401).end("You must be logged in to do that");
      }
      break;

    /** Unlike Idea */
    case "DELETE":
      if (session) {
        try {
          const unlikedIdea = await IdeaModel.findByIdAndUpdate(
            query.id,
            {
              $pull: { likes: userId },
              $inc: { likesLength: -1 },
            },
            { new: true }
          );

          res.status(200).json({ success: true, data: unlikedIdea });
        } catch (error) {
          res.status(400).json({ success: false });
        }
      } else {
        res.status(401).end("You must be logged in to do that");
      }
      break;

    default:
      res.setHeader("Allow", ["PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
