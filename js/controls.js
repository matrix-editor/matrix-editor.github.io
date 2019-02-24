function Controls() {
    let _matrix;

    function init(matrix) {
        _matrix = matrix;

        $('#invert-button').click(_matrix.invert);
        $('#shift-up-button').click(_matrix.shiftUp);
        $('#shift-down-button').click(_matrix.shiftDown);
        $('#shift-left-button').click(_matrix.shiftLeft);
        $('#shift-right-button').click(_matrix.shiftRight);

        $('.leds-case').click(function () {
            const themeName = $(this).attr('id');
            setLedsTheme(themeName);
        });

        function setLedsTheme(themeName) {
            $('body').removeClass('red-leds yellow-leds green-leds blue-leds white-leds black-leds').addClass(themeName);
        }
    }

    return {
        init: init
    }
}
