function Bitmap(width, height) {
    const SIZE = width * height;
    const BASE = 5;

    const ZERO = '0'.repeat(BASE);

    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

    const charsMap = chars.split('').reduce(function (map, char, index) {
        map[char] = index;
        return map;
    }, {});

    const data = [];

    function reset() {
        data.length = SIZE;
        data.fill(0);
        return controls;
    }

    function fromBinaryString(str) {
        reset();
        for (let i = 0; i < str.length; i++) {
            if (i < SIZE) {
                const char = str.charAt(i);
                if (char === '0' || char === '1') {
                    data[i] = char | 0;
                } else {
                    throw 'Invalid char: ' + char + ' in the ' + str;
                }
            } else {
                throw 'Too long string: ' + str;
            }
        }
        return controls;
    }

    function fromCompactString(str) {
        const result = [];
        for (let i = 0; i < str.length; i++) {
            const char = str.charAt(i);
            const byte = charsMap[char];
            if (byte === undefined) {
                throw 'Invalid char: ' + char + ' in the ' + str;
            } else {
                result.push(byte.toString(2));
            }
        }
        return fromBinaryString(result.join(''))
    }

    function toCompactString() {
        const chunksCount = Math.ceil(data.length / BASE);
        const result = [];
        for (let i = 0; i < chunksCount; i++) {
            const num = parseInt(data.slice(i * BASE, (i + 1) * BASE).join(''), 2);
            result.push(chars[num]);
        }
        return result.join('').replace(/A+$/, '');
    }

    function toBinaryString() {
        return data.join('');
    }

    function getBit(index) {
        if (data.length > index) {
            return data[index];
        } else {
            throw 'Invalid index: ' + index;
        }
    }

    function toggleBit(index) {
        if (data.length > index) {
            data[index] = data[index] === 0 ? 1 : 0;
        } else {
            throw 'Invalid index: ' + index;
        }
        return controls;
    }

    function toggleCol(index) {
        if (index >= 0 && index < width) {
            for (let i = 0; i < height; i++) {
                data[i * width + index] = data[i * width + index] ? 0 : 1;
            }
        }
        return controls;
    }

    function toggleRow(index) {
        if (index >= 0 && index < height) {
            let count = 0;
            for (let i = 0; i < width; i++) {
                count += data[index * width + i];
            }
            for (let i = 0; i < width; i++) {
                data[index * width + i] = count === width ? 0 : 1;
            }
        }
        return controls;
    }

    function invertRow(index) {
        if (index >= 0 && index < height) {
            for (let i = 0; i < width; i++) {
                data[index * width + i] = data[index * width + i] ? 0 : 1;
            }
        }
        return controls;
    }

    function setBit0(index) {
        if (data.length > index) {
            data[index] = 0;
        } else {
            throw 'Invalid index: ' + index;
        }
        return controls;
    }

    function setBit1(index) {
        if (data.length > index) {
            data[index] = 1;
        } else {
            throw 'Invalid index: ' + index;
        }
        return controls;
    }

    function invert() {
        for (let i = 0; i < data.length; i++) {
            data[i] = data[i] === 0 ? 1 : 0;
        }
        return controls;
    }

    function shiftUp() {
        for (let i = width; i < SIZE; i++) {
            data [i - width] = data [i];
        }
        data.fill(0, data.length - width, data.length);
        return controls;
    }

    function shiftDown() {
        for (let i = SIZE - 1; i >= width; i--) {
            data [i] = data [i - width];
        }
        data.fill(0, 0, width);
        return controls;
    }

    function shiftLeft() {
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width - 1; j++) {
                data [i * width + j] = data [i * width + j + 1];
            }
            data [(i + 1) * width - 1] = 0;
        }
        return controls;
    }

    function shiftRight() {
        for (let i = 0; i < height; i++) {
            for (let j = width - 1; j > 0; j--) {
                data [i * width + j] = data [i * width + j - 1];
            }
            data [i * width] = 0;
        }
        return controls;
    }

    const controls = {
        reset: reset,
        invert: invert,
        shiftUp: shiftUp,
        shiftDown: shiftDown,
        shiftLeft: shiftLeft,
        shiftRight: shiftRight,
        toggleBit: toggleBit,
        toggleCol: toggleCol,
        toggleRow: toggleRow,
        invertRow: invertRow,
        getBit: getBit,
        setBit0: setBit0,
        setBit1: setBit1,
        fromBinaryString: fromBinaryString,
        toBinaryString: toBinaryString,
        fromCompactString: fromCompactString,
        toCompactString: toCompactString
    };

    return reset();
}

if (typeof module !== 'undefined') {
    module.exports = Bitmap;
}
