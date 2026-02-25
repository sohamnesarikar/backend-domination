import fsPromises from "node:fs/promises";

const fileWrite = async (filePath, data) => {
  try {
    await fsPromises.writeFile(filePath, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export { fileWrite };
