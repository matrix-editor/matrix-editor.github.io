/*
Run tests using command:
  node bits-test.js
*/
const bits = require('./bits.js')();

{
    bits.fromCompressedString('!0!');
    console.assert(bits.toCompressedString() === '!0!');
}

{
    let sourceStr = '11111100' + '00001111' + '11';
    bits.fromBinaryString(sourceStr);
    let resultStr = bits.toCompressedString();
    console.assert(resultStr === '!0!', sourceStr, resultStr);
}

{
    let sourceStr = '11111100' + '00001111' + '110000';
    bits.fromBinaryString(sourceStr);
    let resultStr = bits.toCompressedString();
    console.assert(resultStr === '!0!', sourceStr, resultStr);
}

