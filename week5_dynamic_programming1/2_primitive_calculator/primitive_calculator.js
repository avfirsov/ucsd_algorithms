const divide = (a) => (b) => b / a;
const substract = (a) => (b) => b - a;

const divideBy2 = divide(2);
const divideBy3 = divide(3);
const substract1 = substract(1);

function calc(value) {
  return calcMinOps(value, divideBy2, divideBy3, substract1);
}

function calcMinOps(value, ...ops) {
  const T = [0, 0];
  const prevs = [0, 0];
  let i = 2;
  for (; i <= value; i++) {
    T[i] = ops.reduce((r, curOp) => {
      const prev = curOp(i);
      const curOpRes = T[prev] + 1;
      if (r > curOpRes) {
        prevs[i] = prev;
        return curOpRes;
      } else return r;
    }, Infinity);
  }
  let seq = [];
  let j = prevs.length - 1;
  while (prevs[j] > 0) {
    seq.push(prevs[j]);
    j = prevs[j];
  }
  seq.reverse();
  seq.push(value);
  return `${T[--i]}\n${seq.join(' ')}`;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
  console.log(calc(Number(line)));
});

module.exports = calc;
