$(document).ready(function() {

    $('select').styler({
        selectSearch: false,
        singleSelectzIndex: 5
    });

/*    var sliderSumSteps = {
        points: {
            1500000:	1500000,
            5000000:	3000000,
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
    default_sum = 5000000;

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
            /*if (check_sum){*//*
            if (val != default_sum) {
                changed_sum = true;
            }
            /*}*//*
            sum_sliding = false;
            $('.calc_sum').val(format_number(getSliderValue(sliderSumSteps, ui.value))).trigger("change");
            console.log(ui.value);
        }
    });

    default_refill = 10000;

    $('.calc_refill_slider').slider({
        min: 0,
        max: 50000,
        step: 1000,
        value: default_refill,
        slide: function(e, ui) {
            $('.calc_refill').val(format_number(ui.value)).trigger("change");
        },
        stop: function(e, ui) {
            var val = parseInt($('.calc_refill').val().replace(/[^0-9]/g, ''));
            if (check_refill){
                if (val != default_refill) {
                    changed_refill = true;
                }
            }
            $('.calc_refill').val(format_number(ui.value)).trigger("change");
        }
    });*/


    $('.bxslider').bxSlider({
        pager: false
    });


    var collapsed_class = '-collapsed';
    $('.collapseBlock_collapsing').hide();
    $('.collapseBlock_collapser a').click(function(){
        var $href = $($(this).data('href'));
        $href.slideToggle().toggleClass(collapsed_class);
    });

});

/*
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

*/




// MAP

ymaps.ready(init);
var map;

function init(){
    $map = $('#map');

    lt = $map.attr('data-lt');
    ln = $map.attr('data-ln');

    cen_lt = $map.attr('data-cen-lt');
    cen_ln = $map.attr('data-cen-ln');

    if(lt <= 0 || ln <= 0)
    {
        lt = 55.767266;
        ln = 37.627364;
    }

    if(cen_lt <= 0 || cen_ln <= 0)
    {
        cen_lt = 55.767423;
        cen_ln = 37.62981;
    }

    $('.pdf_map').attr('src', '//static-maps.yandex.ru/1.x/?l=map&size=445,313&pt=' + ln + ',' + lt + ',round&z=11')

    var zoom = 15;

    map = new ymaps.Map("map", {
        center: [cen_lt, cen_ln],
        zoom: zoom,
        controls: []
    },{
        suppressMapOpenBlock: true
    });

    //map.controls.add('zoomControl');

    map.behaviors.disable('scrollZoom');

    placemark = new ymaps.Placemark([lt, ln], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'images/baloon.png',
        iconImageSize: [41, 80],
        iconImageOffset: [-20.5, -80]
    });

    map.geoObjects.add(placemark);


    /* EVENT */
    /*    map.events.add('actionend', function (e) {
     var new_zoom = map.getZoom();
     if (new_zoom != zoom){
     zoom = new_zoom;
     if (isNewEvent('map_actions', 'mashtab')) {
     ga('send', 'event', 'map_actions', 'mashtab');
     }
     sendMapAction();

     }
     }); */

    /*map.events.add('boundschange', function (e) {
        var old_c = e.get('oldCenter'),
            new_c = e.get('newCenter'),
            old_z = e.get('oldZoom'),
            new_z = e.get('newZoom');

        // при изменении зума автоматически меняется центр, поэтому сначала проверяется, был ли зум
        if (old_z != new_z) {
            if (isNewEvent('map_actions', 'mashtab')) {
                ga('send', 'event', 'map_actions', 'mashtab');
                sendMapAction();
            }
        } else if (old_c != new_c) {
            if (isNewEvent('map_actions', 'peremeshenie')) {
                ga('send', 'event', 'map_actions', 'peremeshenie');
                sendMapAction();
            }
        }

    });*/

}