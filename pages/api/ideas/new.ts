import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";

const getRandomAppName = (): string => {
  const data = fs.readFileSync("public/app_names.txt", "utf8");
  const appNames = data.split(/\r?\n/);
  const randomInteger = Math.floor(Math.random() * appNames.length);

  return appNames[randomInteger];
};

const getRandomNoun = (): string => {
  const data = fs.readFileSync("public/nouns.txt", "utf8");
  const appNames = data.split(/\r?\n/);
  const randomInteger = Math.floor(Math.random() * appNames.length);

  return appNames[randomInteger];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    /** Generate new Idea without saving to database */
    case "GET":
      try {
        const generatedIdea = {
          appName: getRandomAppName(),
          noun: getRandomNoun(),
        };

        res.status(200).json(generatedIdea);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
