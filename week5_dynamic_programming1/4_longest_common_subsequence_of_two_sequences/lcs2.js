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
  return D[len1][len2];
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');
let str1, str2;
let lineNumber = 1;
rl.on('line', (line) => {
  if (lineNumber == 2) {
    str1 = line.split(' ').map(Number);
  } else if (lineNumber == 4) {
    str2 = line.split(' ').map(Number);
    console.log(lcs2Dic(str1, str2));
  }
  lineNumber++;
});

module.exports = lcs2Dic;
