/*
Run tests using command:
  node bitmap-test.js
*/
const Bitmap = require('./bitmap.js');

function assertEquals(actual, expected, info) {
    console.assert(actual === expected, JSON.stringify({actual, expected, info}));
}

const bitmap16x16 = Bitmap(16, 16);
const bitmap3x3 = Bitmap(3, 3);
const bitmap2x2 = Bitmap(2, 2);
const bitmap1x1 = Bitmap(1, 1);

console.log('Basics');
assertEquals(bitmap16x16.toCompactString(), '');
assertEquals(bitmap16x16.setBit1(1).toCompactString(), 'J', '000001');
assertEquals(bitmap16x16.setBit0(1).toCompactString(), '', '000000');
assertEquals(bitmap16x16.setBit1(3).toCompactString(), 'C', '000100');
assertEquals(bitmap16x16.setBit1(4).toCompactString(), 'D', '000110');
assertEquals(bitmap16x16.setBit0(3).toCompactString(), 'B', '000010');
assertEquals(bitmap16x16.reset().toCompactString(), '');

console.log('Binary to compact');
assertEquals(bitmap16x16.fromBinaryString('111110000011111').toCompactString(), '9A9');
assertEquals(bitmap16x16.fromBinaryString('1111100000111110000').toCompactString(), '9A9');

console.log('Compact to compact');
assertEquals(bitmap16x16.fromCompactString('A').toCompactString(), '');
assertEquals(bitmap16x16.fromCompactString('9A').toCompactString(), '9');
assertEquals(bitmap16x16.fromCompactString('9A9').toCompactString(), '9A9');
assertEquals(bitmap16x16.fromCompactString('9A9A').toCompactString(), '9A9');

console.log('Invert');
assertEquals(Bitmap(1, 1).fromBinaryString('0').invert().toBinaryString(), '1');
assertEquals(Bitmap(1, 1).fromBinaryString('1').invert().toBinaryString(), '0');
assertEquals(Bitmap(7, 1).fromBinaryString('1011001').invert().toBinaryString(), '0100110');

console.log('Shift up');
assertEquals(bitmap1x1.fromBinaryString('1').shiftUp().toBinaryString(), '0');
assertEquals(bitmap3x3.fromBinaryString('111' + '011' + '010').shiftUp().toBinaryString(), '011' + '010' + '000');
assertEquals(bitmap3x3.fromBinaryString('000' + '100' + '101').shiftUp().toBinaryString(), '100' + '101' + '000');

console.log('Shift down');
assertEquals(bitmap1x1.fromBinaryString('1').shiftDown().toBinaryString(), '0');
assertEquals(bitmap2x2.fromBinaryString('0000').shiftDown().toBinaryString(), '0000');
assertEquals(bitmap2x2.fromBinaryString('1001').shiftDown().toBinaryString(), '0010');
assertEquals(bitmap2x2.fromBinaryString('1111').shiftDown().toBinaryString(), '0011');
assertEquals(bitmap3x3.fromBinaryString('111' + '011' + '010').shiftDown().toBinaryString(), '000' + '111' + '011');
assertEquals(bitmap3x3.fromBinaryString('000' + '100' + '101').shiftDown().toBinaryString(), '000' + '000' + '100');
assertEquals(bitmap3x3.fromBinaryString('111' + '111' + '111').shiftDown().toBinaryString(), '000' + '111' + '111');

console.log('Shift left');
assertEquals(bitmap1x1.fromBinaryString('1').shiftLeft().toBinaryString(), '0');
assertEquals(bitmap3x3.fromBinaryString('111' + '011' + '010').shiftLeft().toBinaryString(), '110' + '110' + '100');
assertEquals(bitmap3x3.fromBinaryString('000' + '100' + '101').shiftLeft().toBinaryString(), '000' + '000' + '010');

console.log('Shift right');
assertEquals(bitmap1x1.fromBinaryString('1').shiftRight().toBinaryString(), '0');
assertEquals(bitmap3x3.fromBinaryString('111' + '011' + '010').shiftRight().toBinaryString(), '011' + '001' + '001');
assertEquals(bitmap3x3.fromBinaryString('000' + '100' + '101').shiftRight().toBinaryString(), '000' + '010' + '010');

