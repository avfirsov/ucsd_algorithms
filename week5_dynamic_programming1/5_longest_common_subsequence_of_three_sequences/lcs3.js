function lcs2Dic(str1 = [], str2 = [], sigma = 0, mu = 0) {
  const len1 = str1.length;
  const len2 = str2.length;
  const D = Array.from({ length: len1 + 1 }).map((v, i) =>
    Array.from({ length: len2 + 1 }).map((v, j) => {
      if (i == 0) return 0;
      if (j == 0) return 0;
    })
  );

  for (let j = 1; j <= len2; j++) {
    for (let i = 1; i <= len1; i++) {
      D[i][j] = Math.max(
        D[i][j - 1] - mu,
        D[i - 1][j] - mu,
        str1[i - 1] == str2[j - 1] ? D[i - 1][j - 1] + 1 : D[i - 1][j - 1] - sigma
      );
    }
  }

  let i = len1;
  let j = len2;
  let current = D[i][j];
  const seq = [];
  while (current > 0) {
    if (str1[i - 1] == str2[j - 1]) {
      seq.push(str1[i - 1]);
      i--;
      j--;
    } else if (current == D[i][j - 1] - mu) {
      j--;
    } else if (current == D[i - 1][j] - mu) {
      i--;
    } else {
    }
    current = D[i][j];
  }
  seq.reverse();
  return seq;
}

const lcsN = (...sequences) => sequences.reduce((r, c) => lcs2Dic(r, c));

const wrapper = (seq1, seq2, seq3) => {
  const result = [
    [seq1, seq2, seq3],
    [seq2, seq1, seq3],
    [seq3, seq2, seq1],
  ].reduce((r, c) => {
    const currentLCS = lcsN(...c);
    return currentLCS.length > r.length ? currentLCS : r;
  }, []);
  return result.length;
};

function lcs3(str1 = [], str2 = [], str3 = [], sigma = 0, mu = 0) {
  const len1 = str1.length;
  const len2 = str2.length;
  const len3 = str3.length;
  const D = Array.from({ length: len1 + 1 }).map((v, i) =>
    Array.from({ length: len2 + 1 }).map((v, j) =>
      Array.from({ length: len3 + 1 }).map((v, k) => {
        if (i == 0) return 0;
        if (j == 0) return 0;
        if (k == 0) return 0;
      })
    )
  );

  for (let k = 1; k <= len3; k++) {
    for (let j = 1; j <= len2; j++) {
      for (let i = 1; i <= len1; i++) {
        D[i][j][k] = Math.max(
          D[i][j - 1][k] - mu,
          D[i][j][k - 1] - mu,
          D[i - 1][j][k] - mu,
          str1[i - 1] == str2[j - 1] && str1[i - 1] == str3[k - 1]
            ? D[i - 1][j - 1][k - 1] + 1
            : D[i - 1][j - 1][k - 1] - sigma
        );
      }
    }
  }
  return D[len1][len2][len3];
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');
let stringNumber = 1;
const sequences = [];
rl.on('line', (line) => {
  if (stringNumber % 2 == 0) {
    sequences.push(line.split(' ').map(Number));
  }
  if (stringNumber == 6) {
    console.log(lcs3(...sequences));
  }
  stringNumber++;
});

module.exports = lcs3;
