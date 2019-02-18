$(function () {
    const $matrix = $('#matrix');


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
                        out.push('<td class="led" data-row="' + i + '" data-col="' + j + '"></td>');
                    }
                }
            }
            out.push('</tr>');
        }
        return out.join('');
    }

    const W = 32;
    const H = 32;
    $matrix.html(generateMatrix(W, H));
    const bitmap1 = bitmap(W * H);

    $matrix.find('.led').mousedown(function () {
        console.log(this);
        $(this).toggleClass('active');
        const row = $(this).attr('data-row') - 1;
        const col = $(this).attr('data-col') - 1;
        bitmap1.toggleBit(row * W + col);
        console.log(bitmap1.toCompressedString());
    });

    function framesToPatterns() {
        const out = [];
        // $frames.find('.frame').each(function () {
        //     out.push($(this).attr('data-hex'));
        // });
        // return out;
    }


    function saveState() {
        var patterns = framesToPatterns();
        // printArduinoCode(patterns);
        window.location.hash = savedHashState = patterns.join('|');
    }

    let savedHashState;
    $(window).on('hashchange', function () {
        if (window.location.hash.slice(1) !== savedHashState) {
            console.log(savedHashState);
        }
    });

});


