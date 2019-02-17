$(function () {
    var $matrix = $('#matrix');

    function generateMatrix(rowsCount, colsCount) {
        var out = [];
        for (var i = 0; i <= rowsCount; i++) {
            out.push('<tr>');
            for (var j = 0; j <= colsCount; j++) {
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

    $matrix.html(generateMatrix(32, 32));


    $matrix.find('.led').mousedown(function () {
        console.log(this);
        $(this).toggleClass('active');
    });


});
