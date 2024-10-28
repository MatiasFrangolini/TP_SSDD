import { readFileSync, writeFileSync, existsSync } from "fs";

export const FILE_PATH = "./jsondb/checkPoints.json";

export const getCheckPoints = () => {
  const fileExist = existsSync(FILE_PATH);
  if (fileExist) {
    const file = readFileSync(FILE_PATH, "utf-8");
    const parsedFile = JSON.parse(file);
    return parsedFile;
  } else {
    return [];
  }
};

export const writeCheckPoints = (checkPoints) => {
  writeFileSync(FILE_PATH, JSON.stringify(checkPoints, null, 2));
};