function Controls() {
    let _matrix;
    let _stateManager;

    const _themes = ['red-leds',
        'yellow-leds',
        'green-leds',
        'blue-leds',
        'white-leds',
        'black-leds'
    ];

    function init(stateManager, matrix) {
        _stateManager = stateManager;
        _matrix = matrix;

        $('#invert-button').click(_matrix.invert);
        $('#clear-button').click(_matrix.clear);
        $('#shift-up-button').click(_matrix.shiftUp);
        $('#shift-down-button').click(_matrix.shiftDown);
        $('#shift-left-button').click(_matrix.shiftLeft);
        $('#shift-right-button').click(_matrix.shiftRight);

        $('.leds-case').click(function () {
            setColor($(this).attr('id'));
            const themeName = _themes.indexOf($(this).attr('id'));

            updateState({color: themeName});
        });

        $('#width-input').change(function () {
            _matrix.setup($('#width-input').val() | 0, $('#height-input').val() | 0);
            updateState({width: $('#width-input').val() | 0});
        });

        $('#height-input').change(function () {
            _matrix.setup($('#width-input').val() | 0, $('#height-input').val() | 0);
            updateState({height: $('#height-input').val() | 0});
        });
    }

    function setColor(color) {
        $('body').removeClass('red-leds yellow-leds green-leds blue-leds white-leds black-leds').addClass(color);
    }

    function stateChanged(state) {
        setColor(_themes[state.color]);
    }

    function updateState(state) {
        _stateManager.updateState(state)
    }

    return {
        init: init,
        stateChanged: stateChanged,
    }
}
