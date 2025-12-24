// process also global object in node js
const name = process.argv[2];

const hours = new Date().getHours();

function greeting() {
  if (hours >= 19 || hours <= 4) return "Good Night";
  if (hours >= 4 && hours <= 12) return "Good Morning";
  if (hours >= 12 && hours <= 16) return "Good Afternoon";

  return "Good Evening";
}

const greet = greeting();
console.log(`${greet} ${name}!`);
