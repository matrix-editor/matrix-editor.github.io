function StateManager() {
    let _onStateChanged;
    let _state;
    let _stateString;

    function loadState() {
        console.log('loadState');
        const hashStateString = window.location.hash.slice(1);

        if (hashStateString !== _stateString) {
            const tmp = hashStateString.match(/W(\d+)H(\d+)C(.+)D([A-Z0-9]*)/);
            if (tmp) {
                setState({
                    width: tmp[1],
                    height: tmp[2],
                    color: tmp[3],
                    data: tmp[4]
                });
            } else {
                console.warn('Invalid state', hashStateString);
                setDefaultState();
            }
            console.log('Loading state', _stateString);
            _onStateChanged(_state);
        }
    }

    function updateState(state) {
        setState({..._state, ...state});
        window.location.hash = _stateString;
        console.log('Update state', _stateString);
    }

    function setDefaultState() {
        setState({
            width: 8,
            height: 8,
            color: 0,
            data: ''
        });
    }

    function setState(state) {
        _state = state;
        _stateString = 'W' + state.width + 'H' + state.height + 'C' + state.color + 'D' + state.data;
    }

    function init(onStateChanged) {
        _onStateChanged = onStateChanged;
        $(window).on('hashchange', loadState);
        loadState();
    }

    return {
        init: init,
        updateState: updateState
    }
}
