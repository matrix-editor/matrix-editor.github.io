function bits() {

    var chars = '-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+';

    return {
        numToChar: function (uint6) {
            if (uint6 >= 0 && uint6 < 64) {
                return chars[uint6];
            } else {
                console.error('Illegal argument', uint6);
                return null;
            }
        }
    };
}

if (module) {
    module.exports = bits;
}
