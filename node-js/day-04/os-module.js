const os = require("node:os");

console.log(os.arch());

console.log(os.type());

console.log(os.cpus());

console.log(os.cpus().length);

console.log(os.platform());

console.log(`Total RAM: ${Math.ceil(os.totalmem() / 1024 / 1024 / 1024)} GB`);
console.log(`Free RAM: ${Math.ceil(os.freemem() / 1024 / 1024 / 1024)} GB`);

console.log(os.homedir());

console.log(os.version());
