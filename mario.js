var heightElem = document.getElementById("height");
var formElem = document.getElementById("draw-form");
var symbolElem = document.getElementById("symbol");
var symbol = "#";


// set a handler function for changing symbols
symbolElem.onchange = function(event) {
	event.preventDefault();
	symbol = this.value;
	drawPyramid(height);
}

// set a handler function for the form's height slider
formElem.oninput = function(event) {

    event.preventDefault();

    clearError();

    // figure out the height the user typed
    heightStr = heightElem.value;

    // if they didn't type anything at all, give a different error message,
	if (heightStr == '') {
        displayError("Please provide a height.");
        return;
    }
	
    // convert the string to an int
    height = parseInt(heightStr);

    // if the height is not-a-number, yell at them and exit early
    if (isNaN(height) || height < 0 || height == 0)  {
        displayError("That's not a valid height.");
        return;
    }

    // if the height is absurdly tall, yell at them and exit early
    var tooTall = 100;
    if (height > tooTall) {
        displayError("Are you cray? I can't build a pyramid that tall.");
        return;
    }

    // draw pyramid with the specified height
    drawPyramid(height);
}

/**
 * displayError
 * Displays an error message on the text input, and colors it red
 */
 
function displayError(message) {
    heightElem.className = "invalid-field";
    document.querySelector(".error-message").innerHTML = message;
}

/*
 * clearError
 * Undisplays the error message and removes the red CSS style
 */
 
function clearError(message) {
    // TODO 3
    // implement this function.
	heightElem.className = '';
    document.querySelector(".error-message").innerHTML = '';
}

/**
 * drawPyramid
 * Renders, in the HTML document, a pyramid of the specified height
 */

function drawPyramid(height) {
	
    // first, clear the old content
    document.getElementById("pyramid").innerHTML = "";

    // for each row....
    for (var row = 0; row < height; row++) {

        // figure out number of bricks and spaces
        var numBricks = row + 2;
        var numSpaces = height - row - 1;

        // build up a string for this row
        var rowStr = "";
        for (var i = 0; i < numSpaces; i++) {
            var spaceChar = "&nbsp"; // this is the HTML encoding for a space " "
            rowStr += spaceChar;
        }
        for (var i = 0; i < numBricks; i++) {
            rowStr += symbol;
        }

        // make a <p> element for this row, and insert it into the #pyramid container
        rowElem = document.createElement("p");
        rowElem.innerHTML = rowStr;
        document.getElementById("pyramid").appendChild(rowElem);
    }
	document.getElementById("showHeight").innerHTML = height;
}

