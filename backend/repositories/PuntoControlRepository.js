import { readFileSync, writeFileSync, existsSync } from "fs";

export const FILE_PATH = "./jsondb/controlPoints.json";

export const getControlPoints = () => {
  const fileExist = existsSync(FILE_PATH);
  if (fileExist) {
    const file = readFileSync(FILE_PATH, "utf-8");
    const parsedFile = JSON.parse(file);
    return parsedFile;
  } else {
    return [];
  }
};

export const writeControlPoints = (controlPoints) => {
  writeFileSync(FILE_PATH, JSON.stringify(controlPoints, null, 2));
};