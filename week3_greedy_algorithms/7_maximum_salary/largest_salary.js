// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');

rl.once('line', (line) => {
  rl.on('line', (line) => {
    console.log(max(line.toString().split(' ').map(Number)))
    process.exit();
  });
});

const max = (pieces) => {
  return pieces.sort(maxToMin).join('');
};

const maxToMin = (a,b) => ''.concat(b,a) - ''.concat(a,b) 

module.exports = max;
