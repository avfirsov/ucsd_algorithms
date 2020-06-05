function partition(divideBetween, values) {
  if (values.length < 3) return false;
  let numbers = values.slice().sort((a, b) => a - b);
  const eachShouldTake = values.reduce((r, c) => r + c) / divideBetween;
  if (Math.floor(eachShouldTake) != eachShouldTake) return false;
  return Array.from({ length: divideBetween })
    .fill(1)
    .reduce((r, c) => {
      const knapsacked = knapsack(eachShouldTake, numbers, numbers);
      if (!r) return false;
      if (knapsacked.maxWeight == eachShouldTake) {
        let i = 0;
        const takenIndxs = knapsacked.items;
        numbers = numbers.filter((number, ind) => ind != takenIndxs[i] || (i++, false));
        return true;
      } else return false;
    }, true);
}

function knapsack(W, w, v) {
  const len = w.length;
  const D = Array.from({ length: len + 1 }).map((v, i) =>
    Array.from({ length: W + 1 }).map((v, j) => {
      if (i == 0) return 0;
      if (j == 0) return 0;
    })
  );

  for (let i = 1; i <= len; i++) {
    for (let j = 1; j <= W; j++) {
      D[i][j] = Math.max(D[i - 1][j - w[i - 1]] + v[i - 1] || 0, D[i - 1][j]);
    }
  }

  const items = [];
  let i = len;
  let j = W;
  let current = D[i][j];
  while (current > 0) {
    if (current == D[i - 1][j - w[i - 1]] + v[i - 1]) {
      items.push(i - 1);
      j -= v[i - 1];
      i--;
    } else {
      i--;
    }
    current = D[i][j];
  }
  items.reverse();

  return { maxWeight: D[len][W], items };
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
  rl.once('line', (line) => {
    const numbers = line.toString().split(' ').map(Number);
    console.log(Number(partition(3, numbers)));
  });
});

module.exports = partition;
