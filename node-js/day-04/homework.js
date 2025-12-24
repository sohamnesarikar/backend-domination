const fs = require("node:fs");
const path = require("node:path");

const filePath = path.join(__dirname, "data", "students", "student.json");
const dirPath = path.join(__dirname, "data", "students");

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "{title: file created}");
}
