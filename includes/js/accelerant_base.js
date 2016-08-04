/**********************************************
*
*	ACC: Default Javascript/jQuery File
*
***********************************************/
//resize vars
var rtime;
var timeout = false;
var delta = 200;

/******************************************************  Ready & Resize */

( function( $ ) {  //ready & Resize
	$( document ).ready( function( $ ) {
		console.log('accelerant_base.js loaded:: 1');
		
		//  call new functions here
		
		if( $('.views-field-field-exposure-conc').length > 0 ) {
			calcExpConc( $, $('td.views-field-field-exposure-conc') );	
		}
		
	} ); // ready function

	$( window ).resize(function( $ ) {
		
		rtime = new Date();
		if (timeout === false) {
			timeout = true;
			setTimeout(function( $ ) {
				resizeend( $ );
			}, delta);
		}
	
	}); // resize function
	
} )( jQuery );
//  onload and resize actions

/******************************************************  Functions */

function resizeend( $ ) {
    if (new Date() - rtime < delta) {
        setTimeout(function( $ ) {
			resizeend( $ );
		}, delta);
    } else { 	

		if(!($)) {$=jQuery;}
        timeout = false;
		
		if( true ) { 
			// do some stuff here
		}
		else {
			// do some stuff here
		}	
	}
} //resizeend

//  add new functions here
function calcExpConc( $, tableCells ) {
	//console.log('averageExpConc called:: 1');
	var totalEvents = tableCells.length;
	var individualEvents = {};
	var countIndividualEvents = 0;
	var numbers = [];
	var minCell = null;
	var maxCell = null;
	var NIOSHLimit = 0.05;
	var OSHALimit = 0.05;
	
	//console.log('averageExpConc totalEvents:: ' + totalEvents);
	
	//each cell add value to sum var
	tableCells.each(function() {
		currVal = parseFloat($(this).text());
		numbers.push(currVal);
		
		minCell = (!(minCell) || (currVal < minCell))?currVal:minCell;		
		maxCell = (!(maxCell) || (currVal > maxCell))?currVal:maxCell;
	});
	
	var meanCells = mean(numbers).toFixed(2);
	var stdDevCells = stdDeviation(numbers, meanCells);
	
	$('td.views-field-title').each(function(){
		if (!individualEvents[$(this).text()]) {
			countIndividualEvents++;
			individualEvents[$(this).text()] = true;
		}
	});
	if( totalEvents == 0 ) {
		$('.view-content')
		.prepend('<strong>No Exposure Events Found</strong>');	
	} else {
		$('.view-content')
			.prepend('<strong>Std Deviation Exposure Conc :: </strong>'
			 + stdDevCells + '<br />')
			.prepend('<strong>Max Exposure Conc :: </strong>'
			 + maxCell + '<br />')
			.prepend('<strong>Min Exposure Conc :: </strong>'
			 + minCell + '<br />')
			.prepend('<strong>Mean/Average Exposure Conc :: </strong>'
			 + meanCells + '<br />')
			 .prepend('<strong>Total Unique Exposure Events Found :: </strong>'
			 + countIndividualEvents + '<br />')
			 .prepend('<strong>Total Exposure Events Found :: </strong>'
			 + totalEvents + '<br />');
	}	
}	

function mean(numbers) {
    // mean of [3, 5, 4, 4, 1, 1, 2, 3] is 2.875
    console.log('Numbers :: '+numbers);
    var total = 0;
    for (i = 0; i < numbers.length; i += 1) {
        total += numbers[i];
    }
    return total / numbers.length;
}
function median(numbers) {
    // median of [3, 5, 4, 4, 1, 1, 2, 3] = 3
    var median = 0,
        numsLen = numbers.length;
    numbers.sort();
    if (numsLen % 2 === 0) { // is even
        // average of two middle numbers
        median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
    } else { // is odd
        // middle number only
        median = numbers[(numsLen - 1) / 2];
    }
    return median;
}
function mode(numbers) {
    // as result can be bimodal or multimodal,
    // the returned result is provided as an array
    // mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
    var modes = [],
        count = [],
        i,
        number,
        maxIndex = 0;
    for (i = 0; i < numbers.length; i += 1) {
        number = numbers[i];
        count[number] = (count[number] || 0) + 1;
        if (count[number] > maxIndex) {
            maxIndex = count[number];
        }
    }
    for (i in count) if (count.hasOwnProperty(i)) {
        if (count[i] === maxIndex) {
            modes.push(Number(i));
        }
    }
    return modes;
}
function range(numbers) {
    // range of [3, 5, 4, 4, 1, 1, 2, 3] is [1, 5]
    numbers.sort();
    return [numbers[0], numbers[numbers.length - 1]];
}
function stdDeviation(numbers, meanCells) {
	var diff = numbers.map(function(number) {
		var diff = number - meanCells;
		return diff;
	});
	
	var squareDiffs = numbers.map(function(number){
	  var diff = number - meanCells;
	  var sqr = diff * diff;
	  return sqr;
	});
	
	var avgSquareDiff = mean(squareDiffs);
	var stdDeviation = Math.sqrt(avgSquareDiff).toFixed(2);
	
	return stdDeviation;
} 
		