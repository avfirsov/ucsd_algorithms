// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');

rl.once('line', (line) => {
  const [itemsCount, knapsackCapacity] = line.toString().split(' ').map(Number);
  const values = [];
  const weights = [];
  let count = 0;

  rl.on('line', (line) => {
    const [v, w] = readLine(line);
    values.push(v);
    weights.push(w);

    if (++count >= itemsCount) {
      console.log(max(itemsCount, knapsackCapacity, values, weights));
      process.exit();
    }
  });
});

function readLine(line) {
  const v = parseInt(line.toString().split(' ')[0], 10);
  const w = parseInt(line.toString().split(' ')[1], 10);

  return [v, w];
}

function max(count, capacity, values, weights) {
  const items = weights
    .map((weight, i) => ({ unitValue: values[i] / weight, weight }))
    .sort((a, b) => b.unitValue - a.unitValue);
  let result = 0;

  while (capacity > 0 && items.length) {
    const item = items[0];
    const nextWeight = Math.min(item.weight, capacity);
    capacity -= nextWeight;
    item.weight -= nextWeight;
    result += nextWeight * item.unitValue;
    if (item.weight == 0) items.shift();
  }

  return result.toFixed(3);
}

module.exports = max;
