const swap = (arr, i, j) => void ([arr[i], arr[j]] = [arr[j], arr[i]]);
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const freeze = (arr) => JSON.parse(JSON.stringify(arr));

const SEGMENT_START = 'SEGMENT_START';
const SEGMENT_END = 'SEGMENT_END';
const POINT = 'POINT';

const getSegmentStartingPoint = (value) => ({
  type: SEGMENT_START,
  value,
});

const getSegmentEndingPoint = (value) => ({
  type: SEGMENT_END,
  value,
});

const getPoint = (value, index) => ({
  type: POINT,
  index,
  value,
});

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
  const [segmentsCount, pointsCount] = line.toString().split(' ').map(Number);
  let i = 1;
  const beginnings = [];
  const endings = [];
  rl.on('line', (line) => {
    if (i <= segmentsCount) {
      const segment = line.toString().split(' ').map(Number);
      endings.push(getSegmentEndingPoint(segment.pop()));
      beginnings.push(getSegmentStartingPoint(segment.pop()));
      i++;
      return;
    }
    const points = line.toString().split(' ').map(Number).map(getPoint);
    console.log(countIntersections([...beginnings, ...endings, ...points]));
    // countIntersections([...beginnings, ...endings, ...points]);

    // process.exit();
  });
});

function countIntersections(allPoints) {
  // console.log('countIntersections -> allPoints', freeze(allPoints));
  const sorted = quickSort3(allPoints);
  return countIntersectionsInSortedArr(sorted).join(' ');
}

const countIntersectionsInSortedArr = (arr) => {
  let result = [];
  let activeSegmentsCount = 0;
  arr.forEach((point) => {
    if (point.type == SEGMENT_START) {
      activeSegmentsCount++;
      return;
    }
    if (point.type == SEGMENT_END) {
      activeSegmentsCount--;
      return;
    }
    if (point.type == POINT) {
      result[point.index] = activeSegmentsCount;
      return;
    }
  });
  return result;
};

const partition3 = (arr, left, right) => {
  const pivotEl = arr[left];
  let k = left;
  let j = left;
  for (let i = left + 1; i <= right; i++) {
    if (arr[i].value <= pivotEl.value) {
      j++;
      swap(arr, j, i);
      if (arr[j].value < pivotEl.value) {
        k++;
        swap(arr, j, k);
      }
    }
  }
  swap(arr, left, k);
  let lastBeginningInd = k - 1;
  let lastPointInd = k - 1;
  for (let m = k; m <= j; m++) {
    if (arr[m].type != SEGMENT_END) {
      lastPointInd++;
      swap(arr, m, lastPointInd);
      if (arr[lastPointInd].type == SEGMENT_START) {
        lastBeginningInd++;
        swap(arr, lastPointInd, lastBeginningInd);
      }
    }
  }
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
module.exports = countIntersections;
