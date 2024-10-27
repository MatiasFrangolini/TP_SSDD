import { readFileSync, writeFileSync, existsSync } from "fs";

export const FILE_PATH = "./jsondb/animals.json";

export const getAnimals = () => {
  const fileExist = existsSync(FILE_PATH);
  if (fileExist) {
    const file = readFileSync(FILE_PATH, "utf-8");
    const parsedFile = JSON.parse(file);
    return parsedFile;
  } else {
    return [];
  }
};

export const writeAnimals = (animals) => {
  const dataToWrite = {
    data: {
      animals: animals
    }
  };
  writeFileSync(FILE_PATH, JSON.stringify(dataToWrite, null, 2));
};
