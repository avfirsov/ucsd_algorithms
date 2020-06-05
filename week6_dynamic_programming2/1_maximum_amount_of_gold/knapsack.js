function gold(W, nudgets) {
  return knapsack(W, nudgets, nudgets);
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
  return D[len][W];
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
  const W = line.toString().split(' ').map(Number)[0];
  rl.once('line', (line) => {
    const nudgets = line.toString().split(' ').map(Number);
    console.log(gold(W, nudgets));
  });
});

module.exports = gold;
