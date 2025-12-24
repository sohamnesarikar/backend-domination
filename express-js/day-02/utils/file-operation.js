import fs from "node:fs/promises";

export const writeFile = async (filePath, data) => {
  try {
    await fs.appendFile(filePath, data);
  } catch (err) {
    console.log(err);
  }
};

export const readFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return data;
  } catch (err) {
    console.log(err);
  }
};
