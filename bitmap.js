function bitmap(length) {
    const BASE = 6;
    const ZERO = '0'.repeat(BASE);
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!';

    const charsMap = chars.split('').reduce(function (map, char, index) {
        map[char] = index;
        return map;
    }, {});

    const data = [];

    function reset() {
        data.length = length;
        for (let i = 0; i < length; i++) {
            data[i] = 0;
        }
    }

    function fromBinaryString(str) {
        reset();
        for (let i = 0; i < str.length; i++) {
            if (i < length) {
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
    }

    function fromCompressedString(str) {
        const result = [];
        for (let i = 0; i < str.length; i++) {
            const char = str.charAt(i);
            const byte = charsMap[char];
            if (byte === undefined) {
                throw 'Invalid char: ' + char + ' in the ' + str;
            } else {
                result.push((ZERO + byte.toString(2)).substr(-BASE));
            }
        }
        fromBinaryString(result.join(''))
    }

    function toCompressedString() {
        const chunksCount = Math.ceil(data.length / BASE);
        const result = [];
        for (let i = 0; i < chunksCount; i++) {
            const num = parseInt(data.slice(i * BASE, (i + 1) * BASE).join(''), 2);
            result.push(chars[num]);
        }
        return result.join('').replace(/0+$/, '');
    }

    function getBit(index) {
        if (data.length > index) {
            return data[index];
        } else {
            throw 'Invalid index: ' + index;
        }
    }

    function setBit0(index) {
        if (data.length > index) {
            data[index] = 0;
        } else {
            throw 'Invalid index: ' + index;
        }
    }

    function setBit1(index) {
        if (data.length > index) {
            data[index] = 1;
        } else {
            throw 'Invalid index: ' + index;
        }
    }

    reset();

    return {
        reset: reset,
        getBit: getBit,
        setBit0: setBit0,
        setBit1: setBit1,
        fromBinaryString: fromBinaryString,
        fromCompressedString: fromCompressedString,
        toCompressedString: toCompressedString
    }
}

if (module) {
    module.exports = bitmap;
}
