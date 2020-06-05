// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
  const arr = line.toString().split(' ').slice(1).map(Number);

  rl.once('line', (line) => {
    const keys = line.toString().split(' ').slice(1).map(Number);
    console.log(binarySearchWrapped(arr, keys));

    // process.exit();
  });
});

const binarySearchWrapped = (arr, keys) => {
  const findInArr = (key) => binarySearch(arr, key);
  return keys.map(Math.floor).map(findInArr).join(' ');
};

function binarySearch(arr = [], key) {
  let left = 0;
  let right = arr.length - 1;
  let pivot;
  while (left != right && left < right) {
    pivot = left + Math.floor((right - left) / 2);
    switch (Math.sign(arr[pivot] - key)) {
      case -1:
        toRight();
        continue;
      case 0:
        return pivot;
      case 1:
        toLeft();
        continue;
    }
  }

  function toRight() {
    left = pivot + 1;
  }

  function toLeft() {
    right = pivot - 1;
  }

  return arr[left] == key ? left : -1;
}

// function binarySearch(arr = [], key) {
//   return arr.indexOf(key);
// }

module.exports = binarySearchWrapped;
