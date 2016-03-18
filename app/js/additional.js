var arProgs = [
    {
        adding_50_100_541_730: "11",
        adding_50_100_366_540: "11",
        adding_50_100_270_365: "11",
        adding_50_100_181_270: "14",
        adding_50_100_91_180: "24",
        adding_50_100_31_90: "30",
        adding_30_50_541_730: "11",
        adding_30_50_366_540: "11",
        adding_30_50_270_365: "11",
        adding_30_50_181_270: "14",
        adding_30_50_91_180: "24",
        adding_30_50_31_90: "30",
        adding_15_30_541_730: "11",
        adding_15_30_366_540: "11",
        adding_15_30_270_365: "29",
        adding_15_30_181_270: "29",
        adding_15_30_91_180: "29",
        adding_15_30_31_90: "29",
        everymonth: false,
        id: "1",
        minRefill: "50000",
        maxRefill: "500000",
        maxSum: "10000000",
        minSum: "1500000",
        name: "Максимальный доход",
        payPercent: "monthly_off",
        percent: "19.71",
        refill: 181,
        minSavingsPeriod: "12",
        minSavingsPeriod: "24"
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
    default_sum = 5000000;
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
		var matchedProg;
		$.each(arProgs, function(){
			var $arProg = $(this)[0];

			if(data.sum >= $arProg.minSum*1 && data.sum <= $arProg.maxSum*1 && data.period >= $arProg.minSavingsPeriod*1 && data.period <= $arProg.maxSavingsPeriod*1 && data.payPercent == $arProg.payPercent)
			{
				matchedProg = $arProg;
			}
		});

		if(matchedProg)
		{
			return matchedProg;
		}
		else
			return false;
	} else {
        console.log('none');
    }
}

function getCalcResult(data, prog)
{
	var arResult = [];

	d = new Date();

	monthNum = d.getMonth();

    console.log(data.sum*1);

	allSum = data.sum*1;
	proceed = allDays = allProceed = finalyPercent = allRefill = 0;
	arYear = [];

	for (i = 0; i < 24; i++)
	{
		allDays += daysInMonth(monthNum+i);
	}

	for (i = 0; i < 24; i++)
	{
		days = daysInMonth(monthNum+i);

		if(i < 3)
		{
			percent = prog.adding_31_90;
		}
		else if(i < 6)
		{
			percent = prog.adding_91_180;
		}
		else if(i < 9)
		{
			percent = prog.adding_181_270;
		}
		else if(i < 12)
		{
			percent = prog.adding_270_365;
		}
		else if(i < 18)
		{
			percent = prog.adding_366_540;
		}
		else
		{
			percent = prog.adding_541_730;
		}

		finalyPercent += percent * 1;


		if(i > 0)
		{
			if(prog.refill === true)
				allSum += data.every;
			else if(prog.refill == 181 && i >= 6)
				allSum += data.every;
		}
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

		allProceed += proceed;

		arYear.push({
			'sum': allSum.toFixed(2) * 1,
			'proceed': proceed,
			'percent': percent
		});
	}

	if(prog.everymonth === false)
		allSum += allProceed;
	else
		allSum += proceed;

	//finalyPercent = ((allProceed / data.sum) * 100);
	finalyPercent = finalyPercent / 12;
	finalyPercent = finalyPercent.toFixed(2) * 1;
	allSum = allSum.toFixed(2) * 1;
	allProceed = allProceed.toFixed(2) * 1;

	return ({
		'arYear': arYear,
		'allProceed': allProceed,
		'allRefill': allRefill,
		'allSum': allSum,
		'percent': finalyPercent,
		'prog': prog});
}

function getCalc()
{
	data = {
		'sum': $('.calc_sum').val().replace(/[^0-9]/g, '')*1,
		'period': $('select.calc_period').val()*1,
		'every': $('.calc_refill').val().replace(/[^0-9]/g, '')*1,
		'payPercent': $('input.monthly:checked').val()
	};

    console.log($('select.calc_period').val());

	prog = getProg(data);

	if(prog !== false)
	{
		$('.calc-output-table').show();
		$('.error-calc').hide();

		result = getCalcResult(data, prog);

		if(typeof result === 'object')
		{
			$('.calc_out_sum_val').html(format_number(Math.round(result.allSum)) + ' ₽');
            console.log(format_number(Math.round(result.allSum)));
			$('.calc_out_prog_val').html(result.prog.name).attr('data-tarif', result.prog.id);
			$('.pdf_prog_title').html(result.prog.name).attr('data-tarif', result.prog.id);
			$('#calc_out_income').html(format_number(result.allProceed) + ' руб.');
			$('#calc_out_percent').html(prog.percent + ' %');

			$('.percentVal').html(prog.percent);
            $('.pdf_percent_val').html(prog.percent);

			$('.sumVal').html(format_number(data.sum));
			$('.periodVal').html(data.period);
			$('.payPercentVal').html(data.payPercent == 'monthly' ? 'Ежемесячная выплата' : 'В конце срока');

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

			pdfHref = '/pdf/?type=calc&city=' + location.pathname.replace(/\//g, '') + '&sum=' + data.sum + '&progId=' + prog.id +'&period=' + data.period +'&refill=' + data.every + '&sumAll=' + result.allSum + '&proceedAll=' + result.allProceed + '&percent=' + result.percent;

			$('.p-link.print-map, .p-link.test-pdf').attr('href', pdfHref);

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

			}
		}
	}
	else
	{
		$('.error-calc').show();
		$('.calc-output-table').hide();
	}
	return false;
}

function daysInMonth(month)
{
	if(month >= 12)
		month = 12 - month;

	d = new Date();
	return 33 - new Date(d.getFullYear(), month, 33).getDate();
}