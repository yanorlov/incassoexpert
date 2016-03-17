$(document).ready(function() {

    $('select').styler({
        selectSearch: false,
        singleSelectzIndex: 5
    });

    var sliderSumSteps = {
        points: {
            1500000:	1500000,
            3000000:	7500000,
            10000000:   10000000
        },
        steps: {
            1500000:	10000,
            3000000:	20000,
            10000000:   50000
        }
    };

    minSum = 1500000;
    maxSum = 10000000;
    default_sum = 3000000;

    $('.calc_sum_slider').slider({
        min: minSum,
        max: maxSum,
        step: 10,
        value: default_sum,
        slide: function (e, ui) {
            sum_sliding = true;
            $('.calc_sum').val(format_number(getSliderValue(sliderSumSteps, ui.value))).trigger("change");
        },
        stop: function (e, ui) {
            var val = parseInt($('.calc_sum').val().replace(/[^0-9]/g, ''));
            /*if (check_sum){*/
            if (val != default_sum) {
                changed_sum = true;
            }
            /*}*/
            sum_sliding = false;
            $('.calc_sum').val(format_number(getSliderValue(sliderSumSteps, ui.value))).trigger("change");
            console.log(ui.value);
        }
    });
});

function format_number(number, round) {
    var result1 = 0;
    var i1 = 0;
    var i2 = 0;
    var result1str = '';
    var result1fin = '';
    var i = 0;
    var str = '';

    if(round !== false)
        result1 = Math.round(number);
    else
    {
        result1 = Math.floor(number);
        rounded = number - result1;
        rounded = rounded.toFixed(2);
    }

    result1str = result1 + '';
    i1 = result1str.length % 3;
    i2 = result1str.length - i1;
    if (i1 > 0)
        result1fin = result1str.substring(0, i1);
    i = i1;
    while (i < result1str.length)
    {
        result1fin = result1fin + ' ' + result1str.substring(i, i + 3);
        i = i + 3;
    }
    if (result1fin.substring(0, 1) == ' ')
        result1fin = result1fin.substring(1, result1fin.length);
    str = result1fin;

    if(round === false && rounded > 0)
    {
        str += rounded.substring(1);
    }

    return str;
}

var objGetPrevItem = function(obj, key) {
    var prev = false,
        val;
    for (var i in obj) {
        if (i == key) {
            if (!val)
                return [0, 0];
            return [parseInt(val, 10), parseInt(obj[val], 10)];
        }
        val = i;
    }
    return;
};

function getSliderValue(steps, val) {
    for (var step in steps.points) {
        if (val <= step) {

            var prev = objGetPrevItem(steps.points, step),
                perc = (val - prev[0]) / (step - prev[0]),
                res = Math.round(prev[1] + (steps.points[step] - prev[1]) * perc);

            for (var s in steps.steps) {
                if (res <= s) {
                    res -= res % steps.steps[s];
                    break;
                }
            }
            return res;
        }
    }
}

function setSliderValue(steps, val) {
    for (var step in steps.points) {
        if (val <= steps.points[step]) {
            var prev = objGetPrevItem(steps.points, step),
                perc = (val - prev[1]) / (steps.points[step] - prev[1]),
                res = Math.round(prev[0] + (step - prev[0]) * perc);
            return res;
        }
    }
}