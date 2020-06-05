const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
  console.log(getMinCoinsSet(parseInt(line, 10), 1, 5, 10).length);
  process.exit();
}

const getMinCoinsSet = (m, ...changeCoinsValues) => {
  const coinsSet = [];
  const orderedChangeCoinsValues = changeCoinsValues.sort((a, b) => b - a);
  let i = 1;
  while (m > 0) {
    const nextValue = orderedChangeCoinsValues.find((val) => m >= val);
    if (!nextValue) throw new Error("Can't change!");
    coinsSet.push(nextValue);
    m -= nextValue;
  }

  return coinsSet;
};
