// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');

rl.once('line', (line) => {
  max(+line.toString());
  process.exit();
});

const max = (bonbons) => {
  const lastIntegerInSequence = Math.floor(getN(bonbons)) - 1;
  const lastInteger = bonbons - Sn(lastIntegerInSequence);
  const result = [];
  for (let index = 1; index <= lastIntegerInSequence; index++) {
    result.push(index);
  }
  result.push(lastInteger);
  console.log(result.length);
  console.log(result.join(' '));
  
  // return `${result.length}\n${result.join(' ')}`;
};

const Sn = (n) => ((n + 1) * n) / 2;
const getN = (x) => (Math.sqrt(1 + 8 * x) - 1) / 2;

module.exports = max;
