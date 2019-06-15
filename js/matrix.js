function Matrix() {
    let _state;
    const $matrix = $('#matrix');

    let W;
    let H;
    let bitmap;

    function ledId(row, col) {
        return 'led_' + row + '_' + col;
    }

    function generateMatrix(rowsCount, colsCount) {
        const out = [];
        for (let i = 0; i < rowsCount + 2; i++) {
            out.push('<tr>');
            for (let j = 0; j < colsCount + 2; j++) {
                if (i === 0) {
                    if (j === 0) {
                        out.push('<td class="num invert" title="Invert"><i class="material-icons">invert_colors</i></td>');
                    } else if (j <= colsCount) {
                        out.push('<td class="num col-invert" data-col="' + j + '">' + j + '</td>');
                    } else {
                        out.push('<td class="num"></td>');
                    }
                } else if (i === rowsCount + 1) {
                    if (j === 0) {
                        out.push('<td class="num"></td>');
                    } else if (j === colsCount + 1) {
                        out.push('<td class="num clear" title="Clear"><i class="material-icons">clear</i></td>');
                    } else if (j <= colsCount) {
                        out.push('<td class="num col-toggle" data-col="' + j + '">' + j + '</td>');
                    }
                } else {
                    if (j === 0) {
                        out.push('<td class="num row-invert" data-row="' + i + '">' + i + '</td>');
                    } else if (j === colsCount + 1) {
                        out.push('<td class="num row-toggle" data-row="' + i + '">' + i + '</td>');
                    } else {
                        out.push('<td class="led" id="' + ledId(i - 1, j - 1) + '"></td>');
                    }
                }
            }
            out.push('</tr>');
        }
        return out.join('');
    }


    function reloadFromCompactString(compressedString) {
        if (!bitmap) {
            setup(16, 16);
        }
        bitmap.fromCompactString(compressedString);
        render();
    }

    function setup(width, height) {
        W = width;
        H = height;
        $matrix.html(generateMatrix(W, H));
        bitmap = Bitmap(W, H);
        setupControls();
    }

    function render() {
        for (let i = 0; i < H; i++) {
            for (let j = 0; j < W; j++) {
                const bit = !!bitmap.getBit(i * W + j);
                $('#' + ledId(i, j)).toggleClass('active', bit);
            }
        }
    }

    function init(state) {
        _state = state;
    }

    function renderAndSaveState() {
        render();
        _state.updateState({data: bitmap.toCompactString()});
    }

    function setupControls() {

        $matrix.find('.led').mousedown(function () {
            $(this).toggleClass('active');
            const ledId = $(this).attr('id').split('_');
            const row = ledId[1] | 0;
            const col = ledId[2] | 0;
            bitmap.toggleBit(row * W + col);
            renderAndSaveState();

        });

        $matrix.find('.num.invert').mousedown(function () {
            bitmap.invert();
            renderAndSaveState();
        });

        $matrix.find('.num.clear').mousedown(function () {
            bitmap.reset();
            renderAndSaveState();
        });

        $matrix.find('.num.row-invert').mousedown(function () {
            const data = $(this).attr('data-row') - 1;
            bitmap.invertRow(data);
            renderAndSaveState();
        });

        $matrix.find('.num.row-toggle').mousedown(function () {
            const data = $(this).attr('data-row') - 1;
            bitmap.toggleRow(data);
            renderAndSaveState();
        });

        $matrix.find('.num.col-invert').mousedown(function () {
            const data = $(this).attr('data-col') - 1;
            bitmap.invertCol(data);
            renderAndSaveState();
        });

        $matrix.find('.num.col-toggle').mousedown(function () {
            const data = $(this).attr('data-col') - 1;
            bitmap.toggleCol(data);
            renderAndSaveState();
        });
    }
    return {
        init: init,
        loadFromCompactString: function (compactString) {
            reloadFromCompactString(compactString);
        },
        setup: function (width, height) {
            setup(width, height);
        },
        invert: function () {
            bitmap.invert();
            renderAndSaveState();
        },
        clear: function () {
            bitmap.reset();
            renderAndSaveState();
        },
        shiftUp: function () {
            bitmap.shiftUp();
            renderAndSaveState();
        },
        shiftDown: function () {
            bitmap.shiftDown();
            renderAndSaveState();
        },
        shiftLeft: function () {
            bitmap.shiftLeft();
            renderAndSaveState();
        },
        shiftRight: function () {
            bitmap.shiftRight();
            renderAndSaveState();
        },
    }
}
