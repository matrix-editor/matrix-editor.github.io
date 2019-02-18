/*
Run tests using command:
  node bitmap-test.js
*/
const bitmap = require('./bitmap.js')(64);

function checkBasics() {
    console.assert(bitmap.toCompressedString() === '');

    bitmap.reset();
    console.assert(bitmap.toCompressedString() === '');

    bitmap.setBit1(3);//000100
    console.assert(bitmap.toCompressedString() === '4');

    bitmap.setBit1(4);//000110
    console.assert(bitmap.toCompressedString() === '6');

    bitmap.setBit0(3);//000010
    console.assert(bitmap.toCompressedString() === '2');
}

function checkBinaryToCompressed(sourceBinaryString, expectedCompressedString) {
    bitmap.fromBinaryString(sourceBinaryString);
    const resultStr = bitmap.toCompressedString();
    console.assert(resultStr === expectedCompressedString, sourceBinaryString, resultStr);
}

function checkCompressedToCompressed(sourceCompressedString, expectedCompressedString) {
    bitmap.fromCompressedString(sourceCompressedString);
    console.assert(bitmap.toCompressedString() === expectedCompressedString);
    console.assert(bitmap.toCompressedString() === expectedCompressedString);
}

checkBasics();
checkBinaryToCompressed('111111000000111111', '!0!');
checkBinaryToCompressed('1111110000001111110000', '!0!');

checkCompressedToCompressed('0', '');
checkCompressedToCompressed('!0', '!');
checkCompressedToCompressed('!0!', '!0!');
checkCompressedToCompressed('!0!0', '!0!');
