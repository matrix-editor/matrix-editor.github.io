function bits() {
    const BASE = 64;
    const BITS = 6;
    const ZERO = '0'.repeat(BITS);
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!';

    const charsMap = chars.split('').reduce(function (map, char, index) {
        map[char] = index;
        return map;
    }, {});

    let data = [];

    function numToChar(uint6) {
        return chars[uint6];
    }

    function fromBinaryString(str) {
        //todo validate
        data = str.split('');
    }

    function fromCompressedString(str) {
        const result = [];
        for (let i = 0; i < str.length; i++) {
            const chr = charsMap[str.charAt(i)];
            if (chr === undefined) {
                throw 'Invalid char: ' + chr + ' in the ' + str;
            }
            result.push((ZERO + chr.toString(2)).substr(-BITS));
        }
        fromBinaryString(result.join(''))
    }

    function toCompressedString() {
        const chunksCount = Math.ceil(data.length / BITS);
        const result = [];
        for (let i = 0; i < chunksCount; i++) {
            const num = parseInt(data.slice(i * BITS, (i + 1) * BITS).join(''), 2);
            result.push(numToChar(num));
        }

        return result.join('').replace(/0+$/, '');
    }

    return {
        fromBinaryString: fromBinaryString,
        fromCompressedString: fromCompressedString,
        toCompressedString: toCompressedString
    }
}

if (module) {
    module.exports = bits;
}
