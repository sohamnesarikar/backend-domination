const path = require("node:path");
const http = require("node:http");
const {
  createFile,
  getFile,
  deleteFile,
  fileAppend,
} = require("./utils/file-operation.js");

const server = http.createServer((req, res) => {
  const filesFolderPath = path.join(__dirname, "files");

  if (req.url === "/" && req.method === "GET") {
    res.end("Welcome to File Manager");
  } else if (req.url === "/read" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body = body + chunk;
    });

    req.on("end", () => {
      const bodyData = JSON.parse(body);
      getFile(`${filesFolderPath}/${bodyData.fileName}`, res);
    });
  } else if (req.url === "/create" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body = body + chunk;
    });

    req.on("end", () => {
      const bodyData = JSON.parse(body);
      createFile(
        `${filesFolderPath}/${bodyData.fileName}`,
        bodyData.content,
        res
      );
    });
  } else if (req.url === "/delete" && req.method === "DELETE") {
    let body = "";

    req.on("data", (chunk) => {
      body = body + chunk;
    });

    req.on("end", () => {
      const bodyData = JSON.parse(body);
      deleteFile(`${filesFolderPath}/${bodyData.fileName}`, res);
    });
  } else if (req.url === "/append" && req.method === "PUT") {
    let body = "";

    req.on("data", (chunk) => {
      body = body + chunk;
    });

    req.on("end", () => {
      const bodyData = JSON.parse(body);
      fileAppend(
        `${filesFolderPath}/${bodyData.fileName}`,
        bodyData.content,
        res
      );
    });
  } else {
    res
      .writeHead(404, "Bad Request", { "content-type": "text/plain" })
      .end("Invalid Request");
  }
});

server.listen(8080, () => {
  console.log(`Server is listening on http://localhost:8080`);
});
