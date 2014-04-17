/**
 * @projectDescription implementation of a clickable grid acts a a super class
 * to BlockCanvas and ColorPicker
 * @author aaronTurecki
 * @version $Revision: 761 $
 * $Date: 2013-11-20 10:50:59 -0800 (Wed, 20 Nov 2013) $
 */

/*
 * ClickGrid: a method to create generic grid comprised of clickable elements
 * This implementation makes extensive use of the ECMA5 Object.defineProperty method
 * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/defineProperty
 * @see http://ejohn.org/blog/ecmascript-5-objects-and-properties/
 * @param {HTMLElement} container - the destination of the click grid
 * @param {Number} rows in ClickGrid
 * @param {Number} cols  in ClickGrid
 * @param {String} id : the id attribute of html table drawn by the clickable grid
 * @param {Function} clickAction to be executed when a grid cell is clicked
 * @param {Array} styleClasses : an array of the styles to be applied as a class to each
 * of the grid cells or a single string to be applied to all of the grid cells
 * @return {ClickGrid}
 * @constructor
 */
function ClickGrid(container, numRows, numCols, id, clickAction, styleClasses) {
    "use strict";
    Object.defineProperty(this, "container", {
        value : container,
        writable : false,
        enumerable : false,
        configurable : false
    });

	Object.defineProperty(this, "rows", {
		value : numRows,
		writable : false,
		enumerable : false,
		configurable : false
	});

	Object.defineProperty(this, "cols", {
		value : numCols,
		writable : false,
		enumerable : false,
		configurable : false
	});

	Object.defineProperty(this, "id", {
		value : id,
		writable : false,
		enumerable : true,
		configurable : false
	});

	//Check if styleClasses is an array
	if(!Array.isArray(styleClasses)) {
		//If not it stores a single styleClass
		var styleClass = styleClasses;

		//Create an appropriately sized array for styleClasses
		styleClasses = [];
		for(var r = 0; r < numRows; r++) {
			styleClasses[r] = [];
		}

		//Store the single styleClass in each cell of the array
		styleClasses.forEach(function(rvalue, rIndex, rArray) {
			for(var z = 0; z < numCols; z++) {
				rArray[rIndex][z] = styleClass;
			}
		});
	}

	Object.defineProperty(this, "styleClasses", {
		value : styleClasses,
		writable : false,
		enumerable : false,
		configurable : false
	});

	Object.defineProperty(this, "clickAction", {
		value : clickAction,
		writable : false,
		enumerable : true,
		configurable : false
	});

    this.draw();

}
ClickGrid.prototype = {};
/**
 * Draw the click Grid by creating a Table HTML Element and appending it as a child
 * to the parentElement.  Also associates an event handler with each td
 */
ClickGrid.prototype.draw = function() {
	var grid = document.createElement("table");

	//set the id of table element
	grid.id = this.id;

	for(var r = 0; r < this.rows; r++) {
		//Create tr element for row
		var row = document.createElement("tr");

		//set the tr id
		row.id = this.id + "Row" + r;

		//create columns
		for(var c = 0; c < this.cols; c++) {
			//create td element
			var tdElement = document.createElement("td");

			//set td id
			tdElement.id = this.id + "TD" + r + c;

			//set the td class to the color
			tdElement.className = this.styleClasses[r][c];

			tdElement.addEventListener("click", this.clickAction, false);

			//Append td to the row
			row.appendChild(tdElement);

			//append the row to the table
			grid.appendChild(row);
		}
	}
	//return the table so the caller can append it to the document
	this.container.appendChild(grid);
};

ClickGrid.prototype.reset = function() {

    while(this.container.hasChildNodes()){
        this.container.removeChild(this.container.firstChild);
    }
    this.draw();
}
