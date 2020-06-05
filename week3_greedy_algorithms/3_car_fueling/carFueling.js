// by Alexander Nikolskiy

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');

const args = [];

rl.on('line', (line) => {
  args.push(line.toString().split(' ').map(Number));
  if (args.length >= 4) {
    console.log(min(...args.flat()));
    process.exit();
  }
});


const min = (distance, maxDistance, numberOfStops, ...stops) => {
  let stopsCount = 0;
  let lastStopInd = 0;
  let i = 0;
  stops.unshift(0);
  stops.push(distance)

  for (let i = 0; i < stops.length; i++) {
    const lastStop = stops[lastStopInd]
    if (stops[i] - lastStop > maxDistance) {
      if (lastStopInd == i - 1) return -1;
      lastStopInd = i - 1;
      stopsCount++;
      i--;
    }    
  }

  return stopsCount;
};

module.exports = min;
