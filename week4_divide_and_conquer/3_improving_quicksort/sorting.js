const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
  rl.once('line', (line) => {
    console.log(quickSort3(line.toString().split(' ').map(Number)).join(' '));
    // process.exit();
  });
});

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const swap = (arr, i, j) => void ([arr[i], arr[j]] = [arr[j], arr[i]]);

const partition3 = (arr, left, right) => {
  const pivotEl = arr[left];
  let k = left;
  let j = left;
  for (let i = left + 1; i <= right; i++) {
    if (arr[i] <= pivotEl) {
      j++;
      swap(arr, j, i);
      if (arr[j] < pivotEl) {
        k++;
        swap(arr, j, k);
      }
    }
  }
  swap(arr, left, k);
  return [k, j];
};

const quickSort3 = (arr = [], left = 0, right = arr.length - 1) => {
  while (left < right) {
    const k = getRandomInt(left, right);
    swap(arr, left, k);
    const [leftPivotInd, rigthPivotInd] = partition3(arr, left, right);
    if (leftPivotInd - left < right - rigthPivotInd) {
      quickSort3(arr, left, leftPivotInd - 1);
      left = rigthPivotInd + 1;
    } else {
      quickSort3(arr, rigthPivotInd + 1, right);
      right = leftPivotInd - 1;
    }
  }
  return arr;
};


module.exports = quickSort3;