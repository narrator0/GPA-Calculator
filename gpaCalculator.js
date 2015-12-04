/*
* This is an easy local webpage that helps you calculate your GPA over GPA 4.0 scale
* 
*
*/


//global var

	//
var totalCredit = 0,

	//The total after multiple the credit
	total       = 0,

	//for the average
	average     = 0,

	//count the number of data
	count       = 0,

	//array of abjects for the table to display
	data        = [];


//data object initialize
function DataObject(point, credit)
{
	var self = this;

	//ths things in the object
	self.count    = count;
	self.point    = point;
	self.credit   = credit;
	self.remove    = "<a class='remove-button' id='" + count + "'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></a>";
	

	self.scaleGpa = function(point)
	{
		if (point >= 80)
		{
			return 4;
		}
		else if (point >= 70)
		{
			return 3;
		}
		else if (point >= 60)
		{
			return 2;
		}
		else if (point >= 50)
		{
			return 1;
		}
		else
		{
			return 0;
		}
	}

	self.gpa      = self.scaleGpa(point);


}


function isIncorrectInput(point, credit)
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
	count ++;
	var record = new DataObject(point, credit);

	data.push(record);

	total       += record.gpa * credit;
	totalCredit += credit;

	showDataTable();

}

function showDataTable()
{	

	$('#data-table').html("");

	$('.data-table').tgs(data);

	//define every button
	$('.remove-button').click(function(){
		

		var id = parseInt($(this).attr('id')) - 1;

		var dataItem = data[id];

		totalCredit -= dataItem.credit;
		total       -= dataItem.credit * dataItem.gpa;

		data.splice(id, 1);

		$('#data-table').html("");

		$('.data-table').tgs(data);

	});

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

	if (isIncorrectInput(point, credit))
	{
		showErrorImformation();
	}
	else
	{
		addRecord(point, credit);
	}
	


	//clear the two input tag
	$('#credit').val("");
	$('#point').val("");

});


$('#refresh-button').click(function(){

	total       = 0;
	totalCredit = 0;
	count       = 0;
	average     = 0;
	data        = [];

	$('.collapse-result').collapse('hide');

	$('#data-table').html("");

});


$('#go-button').click(function(){

	if (count == 0)
	{
		showErrorImformation();

		return 0;
	}

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
	

	if (!isIncorrectInput(credit, point) || !hasInput)
	{
		countAverage();

		showResult();
	}

});












