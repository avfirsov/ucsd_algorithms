// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
  rl.once('line', (line) => {
    const votes = line.toString().split(' ').map(Number);
    console.log(hasMajority(votes));

    process.exit();
  });
});

function hasMajority(arr) {
  const pieceFrom = (arr) => ({
    data: arr,
    majorEl: arr[0],
    majorElCount: 1,
  });

  const helper = (arr) => {
    if (arr.length > 1) {
      return combine(...splitArrIntoTwoEqualParts(arr).map(helper));
    } else return pieceFrom(arr);
  };

  return +Boolean(helper(arr).majorEl);
}

function combine(piece1, piece2) {
  piece1.oppositePiece = piece2;
  piece2.oppositePiece = piece1;
  const dataCombined = piece1.data.concat(piece2.data);
  const totalElCount = dataCombined.length;
  const combinedResult = [piece1, piece2]
    .filter((piece) => piece.majorEl)
    .find((piece) => {
      const majorElCountCombined = countItemInArr(piece.majorEl, piece.oppositePiece.data) + piece.majorElCount;
      if (majorElCountCombined * 2 > totalElCount) {
        piece.majorElCount = majorElCountCombined;
        piece.data = dataCombined;
        return true;
      } else return false;
    });

  return combinedResult || { data: dataCombined, majorEl: undefined, majorElCount: 0 };
}

function countItemInArr(needle, arr) {
  return arr.reduce((r, c) => (c == needle ? r + 1 : r), 0);
}

function splitArrIntoTwoEqualParts(arr) {
  const left = arr.splice(0, Math.floor(arr.length / 2));
  return [left, arr];
}

module.exports = hasMajority;
