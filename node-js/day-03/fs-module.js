const fs = require("node:fs");

///////////////////////////////////////////
/////// Sync version

// write file sync
// fs.writeFileSync("./data.txt", "Node js is more powerful\n");

// read file sync
// const fileData = fs.readFileSync("./data.txt", "utf-8");
// console.log(fileData);

// append file
// fs.appendFileSync("./data.txt", "It is created by Ryan Dahl");

// copy file
// fs.cpSync("./data.txt", "./data-copy.txt");

// unlink file
// fs.unlinkSync("./data-copy.txt");

//////////////////////////////////////////////////
///////  callback version

// fs.writeFile("./cb.txt", "This is fs callback version\n", (err) => {
//   if (err) console.log(err);
// });

// fs.readFile("./cb.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// fs.appendFile("./cb.txt", "the new data is appended", (err) => {
//   if (err) console.log(err);
// });

// fs.unlink("cb.txt", (err) => {
//   if (err) {
//     console.log(err);
//   }
// });

// fs.stat("./data.txt", (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });
