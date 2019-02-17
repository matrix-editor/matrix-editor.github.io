function bits() {

    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    return {
        toBase62: function () {
            return chars[100 % 52];
        }
    };
}

if (module) {
    module.exports = bits;
}
