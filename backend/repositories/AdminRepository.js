import { readFileSync, writeFileSync, existsSync } from "fs";
import { v4 as uuidv4 } from "uuid";

export const FILE_PATH = "./jsondb/admins.json";

export const getAllUsers = () => {
  const fileExist = existsSync(FILE_PATH);
  if (fileExist) {
    const file = readFileSync(FILE_PATH, "utf-8");
    const parsedFile = JSON.parse(file);
    return parsedFile;
  } else {
    return [];
  }
};

export const createUser = (user) => {
  const userWithId = { ...user, id: uuidv4() };
  const dataToWrite = {
    users: userWithId
  };
  writeFileSync(FILE_PATH, JSON.stringify(dataToWrite, null, 2));
};