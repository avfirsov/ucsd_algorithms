// const lis = (arr, subseq = []) => {
//   const lastIndex = subseq.length ? subseq[subseq.length - 1] : -1;
//   const lastElem = subseq.length ? arr[lastIndex] : -Infinity;
//   let result = subseq.length;
//   for (let i = lastIndex + 1; i < arr.length; i++) {
//     const cElem = arr[i];
//     if (cElem > lastElem) {
//       result = Math.max(result, lis(arr, subseq.concat(i)));
//     }
//   }
//   return result;
// };


// const lis = (arr, subLen = 0, lastIndex = -1) => {
//   const lastElem = ~lastIndex ? arr[lastIndex] : -Infinity;
//   let result = subLen;
//   for (let i = lastIndex + 1; i < arr.length; i++) {
//     const cElem = arr[i];
//     if (cElem > lastElem) {
//       result = Math.max(result, lis(arr, subLen + 1, i));
//     }
//   }
//   return result;
// };


const lis = (arr, lastIndex = -1) => {
  const lastElem = ~lastIndex ? arr[lastIndex] : -Infinity;
  let result = 0;
  for (let i = lastIndex + 1; i < arr.length; i++) {
    const cElem = arr[i];
    if (cElem > lastElem) {
      result = Math.max(result, 1 + lis(arr, i));
    }
  }
  return result;
};

