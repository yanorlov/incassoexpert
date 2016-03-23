var arProgs = [
    {
        monthly: false,
        end_of_period: true,
        partial: false,
        id: "1",
        minRefill: "50000",
        maxRefill: "500000",
        name: "Максимальный доход",
        priority: true,
        addings: {
            "1.5-3": [
                {
                    months: 12,
                    percent: 29
                },
                {
                    months: 18,
                    percent: 31
                },
                {
                    months: 24,
                    percent: 33
                }
            ],
            "3-5": [
                {
                    months: 12,
                    percent: 32
                },
                {
                    months: 18,
                    percent: 34
                },
                {
                    months: 24,
                    percent: 35
                }
            ],
            "5-10": [
                {
                    months: 12,
                    percent: 34
                },
                {
                    months: 18,
                    percent: 35
                },
                {
                    months: 24,
                    percent: 36
                }
            ]
        }
    },
    {
        monthly: true,
        end_of_period: true,
        partial: true,
        id: "2",
        minRefill: "50000",
        maxRefill: "500000",
        name: "Удобный процент",
        priority: false,
        addings: {
            "1.5-3": [
                {
                    months: 3,
                    percent: 24
                },
                {
                    months: 6,
                    percent: 24
                },
                {
                    months: 9,
                    percent: 24
                },
                {
                    months: 12,
                    percent: 24
                },
                {
                    months: 18,
                    percent: 24
                },
                {
                    months: 24,
                    percent: 24
                }
            ],
            "3-5": [
                {
                    months: 6,
                    percent: 27
                },
                {
                    months: 9,
                    percent: 27
                },
                {
                    months: 12,
                    percent: 27
                },
                {
                    months: 18,
                    percent: 27
                },
                {
                    months: 24,
                    percent: 27
                }
            ],
            "5-10": [
                {
                    months: 6,
                    percent: 30
                },
                {
                    months: 9,
                    percent: 30
                },
                {
                    months: 12,
                    percent: 30
                },
                {
                    months: 18,
                    percent: 30
                },
                {
                    months: 24,
                    percent: 30
                }
            ]
        }
    },
    {
        monthly: true, // ежемесячная выплата
        end_of_period: false, // в конце срока
        partial: false, // частичная выплата без потери
        id: "3",
        minRefill: "50000", // минимальное пополнение
        maxRefill: "500000", // максимальное пополнение
        name: "Стабильный доход",
        priority: false,
        addings: { // массив пар срок => процент
            "1.5-3": [
                {
                    months: 3,
                    percent: 24
                },
                {
                    months: 6,
                    percent: 24
                },
                {
                    months: 9,
                    percent: 24
                },
                {
                    months: 12,
                    percent: 24
                },
                {
                    months: 18,
                    percent: 24
                },
                {
                    months: 24,
                    percent: 24
                }
            ],
            "3-5": [
                {
                    months: 6,
                    percent: 27
                },
                {
                    months: 9,
                    percent: 27
                },
                {
                    months: 12,
                    percent: 27
                },
                {
                    months: 18,
                    percent: 27
                },
                {
                    months: 24,
                    percent: 27
                }
            ],
            "5-10": [
                {
                    months: 6,
                    percent: 30
                },
                {
                    months: 9,
                    percent: 30
                },
                {
                    months: 12,
                    percent: 30
                },
                {
                    months: 18,
                    percent: 30
                },
                {
                    months: 24,
                    percent: 30
                }
            ]
        }
    },
    {
        monthly: false, // ежемесячная выплата
        end_of_period: true, // в конце срока
        partial: false, // частичная выплата без потери
        id: "4",
        minRefill: "1000", // минимальное пополнение
        maxRefill: "500000", // максимальное пополнение
        name: "Моя цель",
        priority: false,
        addings: { // массив пар срок => процент
            "1.5-3": [
                {
                    months: 6,
                    percent: 27
                },
                {
                    months: 9,
                    percent: 28
                },
                {
                    months: 12,
                    percent: 29
                },
                {
                    months: 18,
                    percent: 29
                },
                {
                    months: 24,
                    percent: 29
                }
            ],
            "3-5": [
                {
                    months: 6,
                    percent: 29
                },
                {
                    months: 9,
                    percent: 30
                },
                {
                    months: 12,
                    percent: 31
                },
                {
                    months: 18,
                    percent: 31
                },
                {
                    months: 24,
                    percent: 31
                }
            ],
            "5-10": [
                {
                    months: 6,
                    percent: 30
                },
                {
                    months: 9,
                    percent: 31
                },
                {
                    months: 12,
                    percent: 32
                },
                {
                    months: 18,
                    percent: 32
                },
                {
                    months: 24,
                    percent: 32
                }
            ]
        }
    }
];

$(document).ready(function(){

	var calc_defaults = calc_defaults || {};

    var sliderSumSteps = {
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
    default_sum = 3000000;
    default_refill = 200000;

	$('.calc_sum_slider').slider({
		min: minSum,
		max: maxSum,
		step: 10,
		value: default_sum,
		slide: function(e, ui) {
            sum_sliding = true;
            $('.calc_sum').val(format_number(getSliderValue(sliderSumSteps, ui.value))).trigger("change");
		},
		stop: function(e, ui) {
            var val = parseInt($('.calc_sum').val().replace(/[^0-9]/g, ''));
            /*if (check_sum){*/
                /*if (val != default_sum) {
                    changed_sum = true;
                }
            /*}*/
            sum_sliding = false;
            $('.calc_sum').val(format_number(getSliderValue(sliderSumSteps, ui.value))).trigger("change");
		}
	});

	$('.calc_sum_slider').slider('value', setSliderValue(sliderSumSteps, default_sum));

	$('.calc_refill_slider').slider({
		min: 0,
		max: 500000,
		step: 1000,
		value: default_refill,
		slide: function(e, ui) {
			$('.calc_refill').val(format_number(ui.value)).trigger("change");
		},
		stop: function(e, ui) {
            var val = parseInt($('.calc_refill').val().replace(/[^0-9]/g, ''));
            /*if (check_refill){
                if (val != default_refill) {
                    changed_refill = true;
                }
            }*/
			$('.calc_refill').val(format_number(ui.value)).trigger("change");
		}
	});

	$('.calc_refill_slider').slider('value', default_refill);
	$('.calc_refill').val(format_number(default_refill)).trigger("change");

	$(".calc_sum, .calc_refill").on({
		keyup: function(e) {
			var key = e.which || e.keyCode;
			if (key === 37 || key === 39)
				return true;

			var val = $(this).val();

			val = format_number(val.replace(/[^0-9]/g, ''));
			$(this).val(val);
			$(this).trigger("change");
		},

        click: function() {
            this.select();
        }
	});

	if(typeof arProgs === 'object')
	{
	    $('.calcInputs input, .calcInputs select').change(function(){
			getCalc();
		});
	}

	if(typeof arProgs === 'object')
		getCalc();
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

function getProg(data)
{
	if(typeof(arProgs) === 'object')
	{
        // ищем подходяшую программу
		var matchedProg = false;
        var found = false;
        var interval = '';

		$.each(arProgs, function(){

            var $arProg = $(this)[0];

            // $arProg[data.payType] == true - проверка на доступность данного метода оплаты для программы
            if(data.freePartial == $arProg.partial && $arProg[data.payType] && data.every >= $arProg.minRefill && data.every <= $arProg.maxRefill) {

                var sum = data.sum;

                if (sum >= 1500000 && sum <= 3000000) {
                    interval = "1.5-3";
                } else if (sum <= 5000000) {
                    interval = "3-5";
                } else if (sum <= 10000000) {
                    interval = "5-10";
                } else {
                    interval = false;
                }

                if (interval) {

                    var row = $arProg.addings[interval];
                    if (row) {

                        $.each(row, function (key, cell){

                            if (cell.months == data.period) {
                                if (!found) {
                                    matchedProg = {
                                        'prog': $arProg,
                                        'percent': cell.percent
                                    };
                                    found = true;
                                } else if ($arProg.priority == true){
                                    matchedProg = {
                                        'prog': $arProg,
                                        'percent': cell.percent
                                    };
                                }
                            }
                        });
                    }
                }
            }
		});

		if(matchedProg)
		{
			return matchedProg;
		}
		else
        {
            console.log('error: no match');
            return false;
        }
	} else {
        console.log('error: no input progs');
    }
}


function getCalcResult(data, prog) {

    var allPeriod = [];
    var allSum = data.sum * 1;
    var finalPercent = (prog.percent/100)/12; // ежемесячный процент = годовой / 12
    var totalIncome = 0;

    var refill = 0;

    if (data.every)
        refill = data.every;

    var monthIncome = (allSum*finalPercent).toFixed(2)*1;


    // калькуляция на срок; если помесячно, то не считать доход каждый раз, он не меняется
    for (i = 1; i <= data.period; i++) {

        if (data.payType != 'monthly') {
            monthIncome = (allSum*finalPercent).toFixed(2)*1;
        }

        totalIncome += monthIncome;

        arMonth = {
            "income": monthIncome,
            "refill": refill,
            "sum": allSum
        };

        allPeriod.push(arMonth);

        allSum = (allSum + monthIncome + refill).toFixed(2)*1;  // УТОЧНИТЬ: процент считать ДО или ПОСЛЕ пополнения
    }

    return {
        "id": prog.prog.id,
        "name": prog.prog.name,
        "allPeriod": allPeriod,
        "allSum": allSum,
        "totalIncome": totalIncome,
        "percent": prog.percent
    };

//    console.log(allSum.toFixed(2)*1);
}

/*function getCalcResult(data, prog)
{
	var arResult = [];

	d = new Date();

	monthNum = d.getMonth();

	allSum = data.sum*1;
	proceed = allDays = allProceed = finalyPercent = allRefill = 0;
	arYear = [];

    for (i = 0; i < data.period; i++)
    {
        allDays += daysInMonth(monthNum+i);
    }
	
    $.each(prog.addings, function(adding){
        if ((data.sum >= adding.fromSum) && (data.sum < adding.toSum) && (allDays >= adding.fromDays) && (allDays < adding.toDays)){
            finalyPercent = adding.percent*1;
        }
    });

    for (i = 0; i < data.period; i++) {

        days = daysInMonth(monthNum+i);

        if(i > 0)
        {
            if(prog.refill === true)
                allSum += data.every;
        }
        if(prog.everymonth === true && i > 0)
        {
            allSum += proceed;
        }

        allRefill += data.every;

        proceed = ((allSum * finalyPercent / 100) * days) / allDays;
        proceed =  proceed.toFixed(2) * 1;

        allProceed += proceed;

        arYear.push({
            'sum': allSum.toFixed(2) * 1,
            'proceed': proceed,
            'percent': finalyPercent
        });

        if(prog.everymonth === false)
            allSum += allProceed;
        else
            allSum += proceed;

        //finalyPercent = ((allProceed / data.sum) * 100);
        finalyPercent = finalyPercent / 12;
        finalyPercent = finalyPercent.toFixed(2) * 1;
        allSum = allSum.toFixed(2) * 1;
        allProceed = allProceed.toFixed(2) * 1;
        console.log('perc = ' + finalyPercent);

        return ({
            'arYear': arYear,
            'allProceed': allProceed,
            'allRefill': allRefill,
            'allSum': allSum,
            'percent': finalyPercent,
            'prog': prog});
    }


    /*

        allSum += data.every;

		if(prog.everymonth === true && i > 0)
		{
			allSum += proceed;
		}

		allRefill += data.every;

		proceed = ((allSum * percent / 100) * days) / allDays;
		proceed =  proceed.toFixed(2) * 1;

		/*if(percent >= 16)
		{
			ndfl = (((allSum * (percent - 16) / 100) * days) / allDays) * 0.35;
		}
		else
			ndfl = 0;

		proceed += ndfl;*/

	/*
}*/

function getCalc()
{
	data = {
		'sum': $('.calc_sum').val().replace(/[^0-9]/g, '')*1,
		'period': $('select.calc_period').val()*1,
		'every': $('.calc_refill').val().replace(/[^0-9]/g, '')*1,
		'payType': $('input.monthly:checked').val(),
        'freePartial': ($('input#partial_take:checked').val()) ? true : false
	};

	prog = getProg(data);

	if(prog !== false)
	{
        $('.calcResult').show();
        $('.calcError').hide();

		result = getCalcResult(data, prog);

        console.log(prog.prog.name);

		if(typeof result === 'object')
		{
			$('.calc_out_sum_val').html(format_number(Math.round(result.allSum)) + ' ₽');
			$('.calc_out_prog_val').html(result.name).attr('data-tarif', result.id);
			$('.pdf_prog_title').html(result.name).attr('data-tarif', result.id);
			$('.calc_out_income_val').html(format_number(result.totalIncome) + ' ₽');
			$('.calc_out_rate_val').html(prog.percent + ' %');

            /*
			$('.percentVal').html(prog.percent);
            $('.pdf_percent_val').html(prog.percent);

			$('.sumVal').html(format_number(data.sum));
			$('.periodVal').html(data.period);
			$('.payMonthlyVal').html(data.payMonthly == 'monthly' ? 'Ежемесячная выплата' : 'В конце срока');

			$('.sumAllVal').html(format_number(result.allSum, false));
			$('.refillVal').html(format_number(data.every));
			$('.proceedAllVal').html(format_number(result.allProceed, false));

			$('.pre-calc-bottom-table tbody').html('');

			var i = 0;
			$.each(result.arYear, function(key, val){
				tr = '';
				tr += '<tr>';
				tr += '<td>' + ++i + '</td>';
				tr += '<td>' + format_number(val.sum, false) + '</td>';

				if(prog.refill === true)
					tr += '<td>' + data.every + '</td>';
				else if(prog.refill == 181 && key >= 6)
					tr += '<td>' + data.every + '</td>';
				else
					tr += '<td>0</td>';
				tr += '<td>' + format_number(val.proceed, false) + '</td>';
				tr += '</tr>';
				$('.pre-calc-bottom-table tbody').append(tr);
			});

			$('.saving-comparison-table .you-get, .saving-comparison-table .profit').html('–');
			$('.saving-comparison-table .active_col').removeClass('active_col');
			$('.tarif'+prog.id).addClass('active_col');

			$('.percent-out').html('–');

			$('.tarif'+prog.id+'.you-get').html(format_number(result.allSum));
			$('.tarif'+prog.id+'.profit').html(format_number(result.allProceed)+' ₽');
			$('.tarif'+prog.id+'.percent-out').html(prog.percent + ' %');

			$('.pdf_sumall').html(format_number(result.allSum));
			$('.pdf_profit').html(format_number(result.allProceed)+' ₽');


			$('.refillS').html('');

			if(prog.refill === false)
			{
				if($('.calc_refill_slider').slider('option', 'disabled') === false)
				{
					$('.calc_refill').val(0);
					$('.calc_refill').attr('disabled', 'disabled');
					$('.calc_refill_slider').slider('disable');
				}
			}
			else
			{
				if($('.calc_refill_slider').slider('option', 'disabled') === true)
				{
					$('.calc_refill_slider').slider('enable');
					$('.calc_refill').removeAttr('disabled');
				}
				if(prog.refill == 181)
					$('.refillS').html('(с 181 дня)');

			}*/
		}
	}
	else
	{
		$('.calcError').show();
		$('.calcResult').hide();
	}
	return false;
}

function daysInMonth(month)
{
	year = d.getFullYear();
	
	if(month >= 12)
	{
		do {
			month = month - 12;
			
			year++			
		} while (month >= 12)
	}
	
	d = new Date();
    
    days = 33 - new Date(year, month, 33).getDate();
    
	return days;
}