function State() {
    let onStateChanged;
    let state = {
        width: 8,
        height: 8,
        data: ''
    };
    let stateString;

    function loadState() {
        const hashStateString = window.location.hash.slice(1);

        if (hashStateString !== stateString) {
            const tmp = hashStateString.match(/W(\d+)H(\d+)D([A-Z0-9]*)/);
            if (tmp) {
                state = {
                    width: tmp[1],
                    height: tmp[2],
                    data: tmp[3]
                };
                stateString = hashStateString;
            } else {
                state = {
                    width: 1,
                    height: 1,
                    data: ''
                };
                console.warn('Invalid state', hashStateString);
            }
        }
        console.log('Loading state', stateString);
        onStateChanged(state);
    }

    function setState(newState) {
        state = {...state, ...newState};
        stateString = 'W' + state.width + 'H' + state.height + 'D' + state.data;
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
        setState: setState
    }
}
