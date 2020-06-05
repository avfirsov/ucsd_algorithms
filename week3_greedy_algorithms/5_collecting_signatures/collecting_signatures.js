// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');

rl.once('line', (line) => {
  const count = +line.toString();
  const coords = [];

  rl.on('line', (line) => {
    coords.push(readLine(line));

    if (coords.length == count) {
      console.log(min(coords));
      process.exit();
    }
  });
});

function readLine(line) {
  return line.toString().split(' ').map(Number);
}

const min = (coords) => {
  const lines = [];
  let sortedCoords = coords.sort((a, b) => a[0] - b[0]);

  while (sortedCoords.length) {
    const nextLineCoords = sortedCoords.shift();
    const nextLineCoord = Math.min(getSmallestLineEndCoord(sortedCoords), nextLineCoords[1]);
    lines.push(nextLineCoord);
    const startsLeftToNextLine = startsLeftToPoint(nextLineCoord);
    sortedCoords = sortedCoords.filter(startsLeftToNextLine);
  }
  return `${lines.length}\n${lines.join(' ')}`;
};

const getSmallestLineEndCoord = (arr) => getSmallest(getEnd(arr));
const getEnd = (arr) => arr.map((line) => line[1]);
const getSmallest = (arr) => arr.reduce((r, c) => (c < r ? c : r), Infinity);
const startsLeftToPoint = (point) => (line) => line[0] > point;

module.exports = min;
