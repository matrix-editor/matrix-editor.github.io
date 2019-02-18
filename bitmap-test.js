/*
Run tests using command:
  node bitmap-test.js
*/
const bitmap = require('./bitmap.js')();

{
    bitmap.fromCompressedString('!0!');
    console.assert(bitmap.toCompressedString() === '!0!');
}

{
    let sourceStr = '11111100' + '00001111' + '11';
    bitmap.fromBinaryString(sourceStr);
    let resultStr = bitmap.toCompressedString();
    console.assert(resultStr === '!0!', sourceStr, resultStr);
}

{
    let sourceStr = '11111100' + '00001111' + '110000';
    bitmap.fromBinaryString(sourceStr);
    let resultStr = bitmap.toCompressedString();
    console.assert(resultStr === '!0!', sourceStr, resultStr);
}

