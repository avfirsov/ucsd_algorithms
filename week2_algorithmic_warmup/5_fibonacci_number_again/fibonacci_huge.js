// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
  if (line !== '\n') {
    const n = parseInt(line.toString().split(' ')[0], 10);
    const m = parseInt(line.toString().split(' ')[1], 10);

    console.log(getFibMod(n, m));
    process.exit();
  }
}

function getFibMod(n, m) {
  const period = getPeriod(m);
  const len = period.length;
  return period[n % len];
}

const getPeriod = (m) => {
  const fibMods = [0, 1];
  let i = 2;
  let expectInd = 0;
  let next;
  while (true) {
    next = (fibMods[i - 1] + fibMods[i - 2]) % m;
    fibMods[i] = next;
    if (next == fibMods[expectInd]) {
      if (expectInd == fibMods.length / 2 - 1) {
        return fibMods.slice(0, expectInd + 1);
      } else {
        expectInd++;
      }
    } else {
      expectInd = 0;
    }
    i++;
  }
};

module.exports = getFibMod;
