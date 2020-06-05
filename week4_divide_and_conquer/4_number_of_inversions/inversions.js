// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
  rl.once('line', (line) => {
    const arr = line.toString().split(' ').map(Number);
    console.log(inversions(arr));

    process.exit();
  });
});

let inversionsCounter = 0;

function inversions(arr) {
  inversionsCounter = 0;
  mergeSort(arr);
  return inversionsCounter;
}

const mergeSorted = (arr1, arr2) => {
  let i = 0,
    j = 0;
  const len1 = arr1.length;
  const len2 = arr2.length;
  let merged = [];
  while (i < len1 && j < len2) {
    arr1[i] === arr2[j]
      ? merged.push(arr1[i++])
      : arr1[i] < arr2[j]
      ? merged.push(arr1[i++])
      : ((inversionsCounter += len1 - i), merged.push(arr2[j++]));
  }

  while (i < len1) {
    merged.push(arr1[i++]);
  }

  while (j < len2) {
    merged.push(arr2[j++]);
  }
  return merged;
};

const mergeSort = (arr, half = Math.floor(arr.length / 2)) =>
  arr.length > 1 ? mergeSorted(mergeSort(arr.slice(0, half)), mergeSort(arr.slice(half))) : arr;

module.exports = inversions;
