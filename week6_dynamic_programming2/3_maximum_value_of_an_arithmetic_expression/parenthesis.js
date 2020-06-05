function parenthesis(numbers, operations) {
  const len = numbers.length;
  const M = Array.from({ length: len }).map((v, i) =>
    Array.from({ length: len }).map((v, j) => {
      if (i == j) return numbers[i];
    })
  );

  const m = Array.from({ length: len }).map((v, i) =>
    Array.from({ length: len }).map((v, j) => {
      if (i == j) return numbers[i];
    })
  );

  function MinMax(i, j) {
    let min = Infinity;
    let max = -Infinity;
    for (let k = i; k < j; k++) {
      const op = operations[k];
      const a = op(M[i][k], M[k + 1][j]);
      const b = op(m[i][k], M[k + 1][j]);
      const c = op(M[i][k], m[k + 1][j]);
      const d = op(m[i][k], m[k + 1][j]);
      min = Math.min(min, a, b, c, d);
      max = Math.max(max, a, b, c, d);
    }
    return [min, max];
  }

  let i, j;
  for (let s = 1; s < len; s++) {
    for (i = 0; (j = i + s), j < len; i++) {
      [m[i][j], M[i][j]] = MinMax(i, j);
    }
  }

  return M[0][len - 1];
}

function parenthesisWrapper(input) {
  const [numbers, operations] = parseInput(input);
  return parenthesis(numbers, operations);
}

const sum = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;

const parseOp = (char) => ({ '-': sub, '+': sum, '*': mul }[char]);

function parseInput(input) {
  return input
    .split('')
    .reduce((r, c, ind) => (ind % 2 != 0 ? (r[1].push(parseOp(c)), r) : (r[0].push(Number(c)), r)), [[], []]);
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
  console.log(parenthesisWrapper(line));
});

module.exports = parenthesisWrapper;
