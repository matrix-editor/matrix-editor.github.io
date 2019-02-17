function bits(initialData) {

    const BASE = 64;
    const BITS = 6;
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!';

    const data = initialData.split('').slice();

    function numToChar(uint6) {
        return chars[uint6];
    }

    return {
        fromBinaryString: function (str) {
            return bits(str.split(''));
        },
        fromCompressedString: function () {

        },
        toCompressedString: function () {
            const chunksCount = Math.ceil(data.length / BITS);
            const result = [];
            for (let i = 0; i < chunksCount; i++) {
                const num = parseInt(data.slice(i * BITS, (i + 1) * BITS).join(''), 2);
                result.push(numToChar(num));
            }

            return result.join('').replace(/0+$/, '');
        }
    }
}

if (module) {
    module.exports = bits;
}
