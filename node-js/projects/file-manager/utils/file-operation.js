const fs = require("node:fs/promises");

const createFile = async (filePath, fileData, res) => {
  try {
    await fs.writeFile(filePath, fileData);
    res.writeHead(200);
    res.end("File Created Successfully");
  } catch (error) {
    res.writeHead(500);
    res.end("Something went wrong or either file is deleted");
  }
};

const getFile = async (filePath, res) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    res.writeHead(200);
    res.end(data);
  } catch (error) {
    res.writeHead(500);
    res.end("Something went wrong or either file is deleted");
  }
};

const deleteFile = async (filePath, res) => {
  try {
    await fs.unlink(filePath);
    res.writeHead(200);
    res.end("File deleted successfully");
  } catch (error) {
    res.writeHead(500);
    res.end("Something went wrong or either file is deleted");
  }
};

const fileAppend = async (filePath, fileData, res) => {
  try {
    await fs.appendFile(filePath, `\n${fileData}`);
    res.writeHead(200);
    res.end("File updated successfully");
  } catch (error) {
    res.writeHead(500);
    res.end("Something went wrong or either file is deleted");
  }
};

module.exports = {
  createFile,
  getFile,
  deleteFile,
  fileAppend,
};
