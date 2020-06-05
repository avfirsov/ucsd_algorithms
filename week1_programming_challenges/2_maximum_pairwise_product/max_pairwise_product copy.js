const readline = require('readline');

process.stdin.setEncoding('utf8');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

rl.on('line', readLine);

let lineCount = 0;

function readLine(line) {
  if (line !== '\n') {
    if (lineCount === 0) {
      lineCount++;
    } else {
      console.log(solve(line.toString().split(' ').map(Number)));
      process.exit();
    }
  }
}

function solve(arr) {
  arr.sort((a, b) => b - a);
  return arr[0] * arr[1];
}
