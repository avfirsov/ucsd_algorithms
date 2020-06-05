// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
  console.log(fib(parseInt(line, 10)));
  process.exit();
}

function fib(n) {
  const memo = [0, 1, 1];
  let i = 3;
  for (; i <= n; i++) {
    memo[i] = (memo[i - 1] + memo[i - 2]) % 10;
  }
  return memo[n];
}

function fibWithMemoryFlush(n) {
  let memo = [0, 1, 1];
  let i = 3;
  const batchSize = 1000;
  let topBorder = Math.min(batchSize, n);
  let complete = 0;
  let compareTo = topBorder;
  do {
    for (; i <= compareTo; i++) {
      memo[i] = (memo[i - 1] + memo[i - 2]) % 10;
    }
    i = 2;
    complete += topBorder;
    console.log('fibWithMemoryFlush -> complete', complete);
    topBorder = Math.min(complete + batchSize, n) - complete;
    compareTo = topBorder + 2;
    console.log('fibWithMemoryFlush -> topBorder', topBorder);
    memo = memo.slice(-2);
    console.log('fibWithMemoryFlush -> memo', memo);
  } while (complete < n);
  return memo[memo.length - 1];
}

module.exports = fib;
