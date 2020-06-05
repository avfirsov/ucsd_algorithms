// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');

const args = [];

rl.on('line', (line) => {
  args.push(line.toString().split(' ').map(Number));
  if (args.length >= 3) {
    console.log(max(args.slice(1)));
    process.exit();
  }
});

const max = (args) => {
  const ppcArr = args[0];
  const clickRateArr = args[1];
  ppcArr.sort(maxToMin);
  clickRateArr.sort(maxToMin);
  return convoluteArrs(ppcArr, clickRateArr);
};

const maxToMin = (a, b) => b - a;

const convoluteArrs = (...arrays) => arrays[0].reduce((r, c, ind) => r + arrays.reduce((r, c) => r * c[ind], 1), 0);

module.exports = max;
