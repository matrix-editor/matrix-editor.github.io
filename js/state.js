function State() {
    let _matrix;
    let savedHashState;

    function loadState() {
        const state = window.location.hash.slice(1);
        if (state !== savedHashState) {
            savedHashState = state;
            console.log('Load state', savedHashState);
            _matrix.loadFromCompactString(savedHashState);
        }
    }

    function saveState(compressedString) {
        window.location.hash = savedHashState = compressedString;
        console.log('Save state', savedHashState);
    }

    function init(matrix) {
        _matrix = matrix;
        $(window).on('hashchange', loadState);
        loadState();
    }

    return {
        init: init,
        saveState: saveState
    }
}
