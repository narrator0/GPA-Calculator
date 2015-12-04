/*
 * juery tgs plugin 0.1
 *
 * Copyright (c) 2015 Arfullight
 *
 * 
 */

/*
//-------ideas will write here-----

 the main idea is to convert JSON data into table easily

 1. get every <td> tag and put its names in an array
 2. read in the data
 3. read every row in the data and append <td> tags according to the names in the array
 
 */

(function($){

	$.fn.tgs = function(dataArray){

		
		//get all the row titles
		var titleArray = this.find('th');
		var table = "";

		for (var i = 0; i < dataArray.length; i++)
		{
			table += "<tr>";
			for (var k = 0; k < titleArray.length; k++)
			{
				table += "<td>" + dataArray[i][titleArray[k].innerText] + "</td>";
			}
			table += "</tr>";
		}

		this.find('tbody').append(table);

	};
	
})(jQuery);




















