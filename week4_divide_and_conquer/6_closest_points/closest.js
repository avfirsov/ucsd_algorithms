'use strict';
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const swap = (arr, i, j) => void ([arr[i], arr[j]] = [arr[j], arr[i]]);

const freeze = (arr) => JSON.parse(JSON.stringify(arr));

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const partition3 = (arr, left, right) => {
  const pivotEl = arr[left];
  let k = left;
  let j = left;
  for (let i = left + 1; i <= right; i++) {
    if (arr[i].x <= pivotEl.x) {
      j++;
      swap(arr, j, i);
      if (arr[j].x < pivotEl.x) {
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

const createPointFromArray = (arr) => ({
  x: arr[0],
  y: arr[1],
});

const getDistance = (point1, point2) => Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);

const getMaxEl = (arr) => arr.reduce((r, c) => (r < c ? c : r), -Infinity);
const getMinEl = (arr) => arr.reduce((r, c) => (r > c ? c : r), Infinity);
const getXCoord = (points) => points.map((point) => point.x);

const mergeSorted = (arr1, arr2) => {
  let i = 0,
    j = 0;
  const len1 = arr1.length;
  const len2 = arr2.length;
  let merged = [];
  while (i < len1 && j < len2) {
    arr1[i].y === arr2[j].y
      ? merged.push(arr1[i++], arr2[j++])
      : arr1[i].y < arr2[j].y
      ? merged.push(arr1[i++])
      : merged.push(arr2[j++]);
  }

  while (i < len1) {
    merged.push(arr1[i++]);
  }

  while (j < len2) {
    merged.push(arr2[j++]);
  }
  return merged;
};

const areCloser = (epsilon, num1) => (point) => Math.abs(num1 - point.x) < epsilon;

const getMinDistance = (segment1, segment2, mergedPoints) => {
  const borderX = (segment2.leftX + segment1.rightX) / 2;

  const points1 = segment1.points;
  const points2 = segment2.points;
  if (points1.length * points2.length == 1) return getDistance(points1[0], points2[0]);
  const d = Math.min(
    // segment1.minDistance, segment2.minDistance);
    segment1.points.length > 1 ? segment1.minDistance : Infinity,
    segment2.points.length > 1 ? segment2.minDistance : Infinity
  );
  const areCloserToBorderThanD = areCloser(d, borderX);
  const filteredMerged = mergedPoints.filter(areCloserToBorderThanD);
  const minDistanceNearBorder = filteredMerged.reduce((r, currentPoint, i, arr) => {
    let smallestDistance = Infinity;
    const toInd = Math.min(i + 8, arr.length);
    for (let j = i + 1; j < toInd; j++) {
      smallestDistance = Math.min(smallestDistance, getDistance(currentPoint, arr[j]));
    }
    return r > smallestDistance ? smallestDistance : r;
  }, Infinity);
  return Math.min(d, minDistanceNearBorder);
};


const createSegmentFromPoint = (point) => ({
  points: [point],
  minDistance: 0,
  leftX: point.x,
  rightX: point.x,
});

const wrapper = (points) => closest(points.map(createPointFromArray));

function closest(points) {
  const x_sorted = quickSort3(points);

  const helper = (points) => {
    const half = Math.floor(points.length / 2);
    if (points.length > 1) {
      return mergeSegments(helper(points.slice(0, half)), helper(points.slice(half)));
    } else {
      return createSegmentFromPoint(points[0]);
    }
  };

  const mergeSegments = (segment1, segment2) => {
    const mergePoints = mergeSorted(segment1.points, segment2.points);
    return {
      points: mergePoints,
      minDistance: getMinDistance(segment1, segment2, mergePoints),
      //maybe Math.min may be ommited cause points (=> and segments) are already x-sorted
      leftX: Math.min(segment1.leftX, segment2.leftX),
      rightX: Math.max(segment1.rightX, segment2.rightX),
    };
  };

  const result = helper(x_sorted);
  return result.minDistance.toFixed(4);
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
  const pointsCount = line.toString().split(' ').map(Number);
  let i = 1;
  const points = [];
  rl.on('line', (line) => {
    if (i < pointsCount) {
      points.push(line.toString().split(' ').map(Number));
      i++;
      return;
    }
    points.push(line.toString().split(' ').map(Number));
    console.log(wrapper(points));
    // countIntersections([...beginnings, ...endings, ...points]);

    // process.exit();
  });
});

module.exports = wrapper;
