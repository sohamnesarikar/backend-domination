import { readFile } from "../utils/file-operation.js";

export const getAllLogs = async (req, res) => {
  const data = await readFile("./logs/logs.log");
  res.send(data);
};

export const downloadLogs = (req, res) => {
  res.download("./logs/logs.log", "logs.txt", (err) => {
    if (err) {
      res.status(500).json({ message: "Log file not found" });
    }
  });
};
