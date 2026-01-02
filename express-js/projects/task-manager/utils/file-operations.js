import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const filePath = path.join(dirName, "..", "..", "data", "task.json");
const dirPath = path.join(dirName, "..", "..", "data");

export const readFile = async () => {
  try {
    const isFileExist = await isExists();
    if (!isFileExist) {
      await fs.mkdir(dirPath, { recursive: true });
      await writeFile([]);
    }
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
};

export const writeFile = async (data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const isExists = async () => {
  try {
    await fs.access(filePath);
    return true;
  } catch (err) {
    return false;
  }
};
