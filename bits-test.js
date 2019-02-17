/*
Run tests using command:
  node bits-test.js
*/
const bits = require('./bits.js');

console.assert(bits().numToChar(0) === '-', 'numToChar failed for', 0);
console.assert(bits().numToChar(1) === 'a', 'numToChar failed for', 1);
console.assert(bits().numToChar(63) === '+', 'numToChar failed for', 63);
console.assert(bits().numToChar(64) === null, 'numToChar failed for', null);
