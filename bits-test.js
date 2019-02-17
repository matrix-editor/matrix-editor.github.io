/*
Run tests using command:
  node bits-test.js
*/
const bits = require('./bits.js');

// console.assert(bits().numToChar(0) === '-', 'numToChar failed for', 0);
// console.assert(bits().numToChar(1) === 'a', 'numToChar failed for', 1);
// console.assert(bits().numToChar(63) === '+', 'numToChar failed for', 63);
// console.assert(bits().numToChar(64) === undefined, 'numToChar failed for', null);
//

let sourceStr, resultStr;

sourceStr = '11111100' + '00001111' + '11';
resultStr = bits(sourceStr).toCompressedString();
console.assert(resultStr === '!0!', sourceStr, resultStr);

sourceStr = '11111100' + '00001111' + '110000';
resultStr = bits(sourceStr).toCompressedString();
console.assert(resultStr === '!0!', sourceStr, resultStr);


console.log(bits('1111111111111111').toCompressedString());
