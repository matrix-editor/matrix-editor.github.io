$(function () {
    const $body = $('body');

    const $matrix = $('#matrix');

    const W = 32;
    const H = 32;


    function ledId(row, col) {
        return 'led_' + row + '_' + col;
    }

    function generateMatrix(rowsCount, colsCount) {
        const out = [];
        for (let i = 0; i <= rowsCount; i++) {
            out.push('<tr>');
            for (let j = 0; j <= colsCount; j++) {
                if (i === 0) {
                    if (j === 0) {
                        out.push('<td class="num" data-row="' + i + '" data-col="' + j + '">X</td>');
                    } else {
                        out.push('<td class="num" data-row="' + i + '" data-col="' + j + '">' + j + '</td>');
                    }
                } else {
                    if (j === 0) {
                        out.push('<td class="num" data-row="' + i + '" data-col="' + j + '">' + i + '</td>');
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
    const bitmap = Bitmap(W * H);

    $matrix.find('.led').mousedown(function () {
        $(this).toggleClass('active');
        const ledId = $(this).attr('id').split('_');
        const row = ledId[1] | 0;
        const col = ledId[2] | 0;
        bitmap.toggleBit(row * W + col);
        saveState(bitmap.toCompressedString());
    });

    function reloadFromCompressedString(compressedString) {
        bitmap.fromCompressedString(compressedString);
        for (let i = 0; i < H; i++) {
            for (let j = 0; j < W; j++) {
                const bit = !!bitmap.getBit(i * W + j);
                $('#' + ledId(i, j)).toggleClass('active', bit);
            }
        }
    }

    // Theme
    $('.leds-case').click(function () {
        var themeName = $(this).attr('id');
        setLedsTheme(themeName);
    });

    function setLedsTheme(themeName) {
        $body.removeClass('red-leds yellow-leds green-leds blue-leds white-leds black-leds').addClass(themeName);
    }

    // State management
    let savedHashState;

    function saveState(compressedString) {
        window.location.hash = savedHashState = compressedString;
        console.log('Save state', savedHashState);
    }

    function loadState() {
        const state = window.location.hash.slice(1);
        if (state !== savedHashState) {
            savedHashState = state;
            console.log('Load state', savedHashState);
            reloadFromCompressedString(savedHashState);
        }
    }

    $(window).on('hashchange', loadState);
    loadState();
});



