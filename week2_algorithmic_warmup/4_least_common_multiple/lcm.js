// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
    if (line !== "\n") {
        const a = parseInt(line.toString().split(' ')[0], 10);
        const b = parseInt(line.toString().split(' ')[1], 10);

        console.log(lcm(a, b));
        process.exit();
    }
}

function lcm(a,b) {
  return a * b / gcd(a,b);
}


function gcd(a, b) {
  let residue;
  let max = Math.max(a,b);
  let min = Math.min(a,b);
  
  do {
    residue = max % min;
    max = Math.max(residue, min);
    min = Math.min(residue, min);
  } while (residue != 0)
  return max;
}

module.exports = lcm;
