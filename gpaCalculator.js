/*
* This is an easy local webpage that helps you calculate your GPA over GPA 4.0 scale
* 
*
*/


//global var
var totalCredit = 0,
	total       = 0,
	average     = 0,
	count       = 0,
	tableHtml   = "";


function isIncorrectPoint(point, credit)
{
	if (point > 100 || point < 0 || isNaN(point) || isNaN(credit) || credit <= 0)
		return true;
	else
		return false;
}

//show error message for 3 seconds
function showErrorImformation()
{
	$('.collapse-error').collapse('show');		

	window.setTimeout(function(){
		$('.collapse-error').collapse('hide');
	}, 3000);
}


function addRecord(point, credit)
{
	if (isIncorrectPoint(point, credit))
	{
		showErrorImformation();
		return 0;
	}
	else if (point >= 80)
	{
		total += 4 * credit;
		totalCredit += credit;
	}
	else if (point >= 70)
	{
		total += 3 * credit;
		totalCredit += credit;
	}
	else if (point >= 60)
	{
		total += 2 * credit;
		totalCredit += credit;
	}
	else if (point >= 50)
	{
		total += 1 * credit;
		totalCredit += credit;
	}
	else
	{
		total += 0 * credit;
		totalCredit += credit;
	}

	showDataTable(point, credit);

}

function showDataTable(point, credit)
{
	count ++;

	tableHtml += "<tr><td>";
	tableHtml += count;
	tableHtml += "</td><td>"
	tableHtml += point;
	tableHtml += "</td><td>"
	tableHtml += credit;
	tableHtml += "</td></tr>"


	$('#data-table').html(tableHtml);

}


function countAverage()
{
	average = parseFloat(total) / parseFloat(totalCredit);
}

function showResult()
{
	average = Math.round(average * 100) / 100;

	$('#result').html("Your average GPA is => <strong>" + average + "</strong>");

	$('.collapse-result').collapse('show');
}


$('#next-button').click(function(){

	//get the input from the form
	var credit = parseInt($('#credit').val());
	var point  = parseInt($('#point').val());


	addRecord(point, credit);


	//clear the two input tag
	$('#credit').val("");
	$('#point').val("");

});


$('#refresh-button').click(function(){

	total = 0;
	totalCredit = 0;
	tableHtml = "";


	$('.collapse-result').collapse('hide');

	$('#data-table').html(tableHtml);

});


$('#go-button').click(function(){

	var credit = 0, point = 0, hasInput = false;

	//check if there is any input
	if ($('#credit').val() != "" || $('#point').val() != "")
	{
		hasInput = true;
		
		//get the input from the form
		credit = parseInt($('#credit').val());
		point  = parseInt($('#point').val());

		addRecord(point, credit);

		//clear the two input tag
		$('#credit').val("");
		$('#point').val("");

	}
	

	if (!isIncorrectPoint(credit, point) || !hasInput)
	{
		countAverage();

		showResult();
	}

});





