const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
  const str1 = String(line).trim();
  rl.once('line', (line) => {
    const str2 = String(line).trim();
    console.log(getDistance(str1, str2));
  });
});

function getDistance(str1 = '', str2 = '') {
  const len1 = str1.length;
  const len2 = str2.length;
  const D = Array.from({ length: len1 + 1 }).map((v, i) =>
    Array.from({ length: len2 + 1 }).map((v, j) => {
      if (i == 0) return j;
      if (j == 0) return i;
    })
  );

  for (let j = 1; j <= len2; j++) {
    for (let i = 1; i <= len1; i++) {
      D[i][j] = Math.min(
        D[i][j - 1] + 1,
        D[i - 1][j] + 1,
        str1[i - 1] == str2[j - 1] ? D[i - 1][j - 1] : D[i - 1][j - 1] + 1
      );
    }
  }
  return D[len1][len2];
}
module.exports = getDistance;
