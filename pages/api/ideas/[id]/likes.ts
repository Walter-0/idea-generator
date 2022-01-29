import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { createHmac } from "crypto";

import { IdeaModel } from "../../../../models/Idea";

const secret = process.env.JWT_SECRET as string;

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
        const email = session.user!.email!;
        const hash = createHmac("sha256", secret).update(email).digest("hex");

        try {
          const likedIdea = await IdeaModel.findByIdAndUpdate(
            query.id,
            {
              $addToSet: { likes: hash },
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
          const email = session.user!.email!;
          const hash = createHmac("sha256", secret).update(email).digest("hex");

          const unlikedIdea = await IdeaModel.findByIdAndUpdate(
            query.id,
            {
              $pull: { likes: hash },
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
