import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import path from "path";

const getRandomAppName = (): string => {
  const data = fs.readFileSync(
    `${path.join(process.cwd())}/public/app_names.txt`,
    "utf8"
  );
  const appNames = data.split(/\r?\n/);
  const randomInteger = Math.floor(Math.random() * appNames.length);

  return appNames[randomInteger];
};

const getRandomNoun = (): string => {
  const data = fs.readFileSync(
    `${path.join(process.cwd())}/public/nouns.txt`,
    "utf8"
  );
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

        return res.status(200).json(generatedIdea);
      } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false });
      }

    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
