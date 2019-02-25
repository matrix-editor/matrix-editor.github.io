function Matrix() {
    let _state;
    const $body = $('body');

    const $matrix = $('#matrix');

    const W = 16;
    const H = 16;


    function ledId(row, col) {
        return 'led_' + row + '_' + col;
    }

    function generateMatrix(rowsCount, colsCount) {
        const out = [];
        for (let i = 0; i < rowsCount + 2; i++) {
            out.push('<tr>');
            for (let j = 0; j < colsCount + 2; j++) {
                if (i === 0 || i === rowsCount + 1) {
                    if (j === 0) {
                        out.push('<td class="num invert" title="Invert">i</td>');
                    } else if (j <= colsCount) {
                        out.push('<td class="num col" data-col="' + j + '">' + j + '</td>');
                    }
                } else {
                    if (j === 0) {
                        out.push('<td class="num row-toggle" data-row="' + i + '">' + i + '</td>');
                    } else if (j === colsCount + 1) {
                        out.push('<td class="num row-invert" data-row="' + i + '">' + i + '</td>');
                    } else {
                        out.push('<td class="led" id="' + ledId(i - 1, j - 1) + '"></td>');
                    }
                }
            }
            out.push('</tr>');
        }
        return out.join('');
    }

    $matrix.html(generateMatrix(W, H));
    const bitmap = Bitmap(W, H);

    function reloadFromCompactString(compressedString) {
        bitmap.fromCompactString(compressedString);
        render();
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
        _state.saveState(bitmap.toCompactString());
    }

    function todo() {
        console.log('todo');
    }


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

    $matrix.find('.num.col').mousedown(function () {
        const data = $(this).attr('data-col') - 1;
        bitmap.toggleCol(data);
        renderAndSaveState();
    });

    return {
        init: init,
        loadFromCompactString: function (compactString) {
            reloadFromCompactString(compactString);
        },
        invert: function () {
            bitmap.invert();
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
