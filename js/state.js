function State() {
    let onStateChanged;
    let state = defaultState();
    let stateString;

    function defaultState() {
        return {
            width: 8,
            height: 8,
            color: 0,
            data: ''
        }
    }

    function loadState() {
        const hashStateString = window.location.hash.slice(1);

        if (hashStateString !== stateString) {
            const tmp = hashStateString.match(/W(\d+)H(\d+)C(\d+)D([A-Z0-9]*)/);
            if (tmp) {
                state = {
                    width: tmp[1],
                    height: tmp[2],
                    color: tmp[3],
                    data: tmp[4]
                };
                stateString = hashStateString;
            } else {
                state = defaultState();
                console.warn('Invalid state', hashStateString);
            }
        }
        console.log('Loading state', stateString);
        onStateChanged(state);
    }

    function updateState(newState) {
        state = {...state, ...newState};
        stateString = 'W' + state.width + 'H' + state.height + 'C' + state.color + 'D' + state.data;
        window.location.hash = stateString;
        console.log('Save state', stateString);
    }

    function init(onStateChangedCallback) {
        onStateChanged = onStateChangedCallback;
        $(window).on('hashchange', loadState);
        loadState();
    }

    return {
        init: init,
        updateState: updateState
    }
}
