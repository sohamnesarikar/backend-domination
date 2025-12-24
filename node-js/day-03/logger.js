const http = require("node:http");
const fs = require("node:fs");

// Callback version
const server = http.createServer((req, res) => {
  const dateTime = new Date().toISOString();
  const log = `${req.method} - ${dateTime} - ${req.url}\n`;

  fs.appendFile("./logs.log", log, (err) => {
    if (err) {
      return res.end("Error in appending log file");
    } else {
      if (req.url === "/logs") {
        fs.readFile("./logs.log", "utf-8", (err, data) => {
          if (err) {
            return res.end("Error in reading log file");
          } else {
            res.write(data);
            res.end();
          }
        });
      } else {
        res.end("log file created");
      }
    }
  });
});

server.listen(8080, () => {
  console.log(`Server is listening on http://localhost:8080`);
});

/* Async await version
async function readFileData(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function appendFileData(filePath, fileData) {
  try {
    await fs.appendFile(filePath, fileData);
  } catch (err) {
    console.log(err);
  }
}

const server = http.createServer(async (req, res) => {
  const dateTime = new Date().toISOString();
  const log = `${req.method} - ${dateTime} - ${req.url}\n`;

  switch (req.url) {
    case "/logs":
      await appendFileData("./logs.log", log);
      const logData = await readFileData("./logs.log");
      res.write(logData);
      break;

    default:
      await appendFileData("./logs.log", log);
  }

  res.end();
});
*/
