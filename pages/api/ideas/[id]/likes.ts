import type { NextApiRequest, NextApiResponse } from "next";
import { IdeaModel } from "../../../../models/Idea";

const userId = "61f2c9a5185f662249248c06";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  switch (method) {
    /** Like Idea */
    case "PATCH":
      try {
        const likedIdea = await IdeaModel.findByIdAndUpdate(
          query.id,
          { $addToSet: { likes: userId } },
          { new: true }
        );

        res.status(200).json({ success: true, data: likedIdea });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    /** Unlike Idea */
    case "DELETE":
      try {
        const unlikedIdea = await IdeaModel.findByIdAndUpdate(
          query.id,
          { $pull: { likes: userId } },
          { new: true }
        );

        res.status(200).json({ success: true, data: unlikedIdea });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.setHeader("Allow", ["PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
