function changeDP(value) {
  return calcChangeDP(value, 1, 3, 4);
}

function calcChangeDP(value, ...coinsSet) {
  const T = [0];
  let i = 1;
  for (; i <= value; i++) {
    T[i] = coinsSet.reduce((r, currentDenomination) => {
      const resultWithCurrentDenom = T[i - currentDenomination] + 1;
      return r > resultWithCurrentDenom ? resultWithCurrentDenom : r;
    }, Infinity);
  }
  return T[--i];
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
  console.log(changeDP(Number(line)));
});

module.exports = changeDP;
