/**
 * @projectDescription implementation of a block drawing canvas
 * Implements inheritance using ECMA5 methods
 * @author aaronTurecki
 * @version $Revision: 761 $
 * $Date: 2013-11-20 10:50:59 -0800 (Wed, 20 Nov 2013) $
 */

/*
 * @classDescription BlockCanvas A simple "object type" that acts as a grid of set-able color blocks
 * @param {HTMLElement} container the destination element for housing the BlockCanvas
 * @param {Function} getColor the function used to get the current color
 * @param {Object} getColorSource the object of which getColor is a method
 * @return {BlockCanvas}
 * @constructor
 */
function BlockCanvas(container, getColor) {
    "use strict";
	var rows = 60;
	var cols = 60;
	var defaultStyle = "blank";
	var id = "blockCanvas";

	Object.defineProperty(this, "_getColor", {
		value : getColor,
		writable : false,
		enumerable : false,
		configurable : false
	});

    //Invoke the "super class" constructor with the current object acting as "this" within the ClickGrid constructor
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call#Using_call_to_chain_constructors_for_an_object
	ClickGrid.call(this, container, rows, cols, id, this.setColor.bind(this), defaultStyle);


    //Drag to Draw Functionality
    // when removing an event listener it must be removed by name therefore the invocation of the binding of setcolor to
    // the current object is given a name (bcSetColor) so that it may be removed later
    var bcSetColor = this.setColor.bind(this);

    //This adds an event listener to the BlockCanvas container to change color of the cells on on mouseover
    function startDraw(evt){
        container.addEventListener("mouseover",bcSetColor);
    }

    //This removes the event listener from the BlockCanvas container that changes the color of cells on mouseover
    function stopDraw(evt){
        container.removeEventListener("mouseover",bcSetColor);
    }

    //Register Event Handlers on mousedown and mouseup that turn on and off the color change handlers
    container.addEventListener("mousedown",startDraw);
    container.addEventListener("mouseup",stopDraw);
}

// Following sets the current objects prototype to an instance of its parents prototype
BlockCanvas.prototype = Object.create(ClickGrid.prototype);

/**
 * Handles the click event by setting the color of the clicked element to the
 * return value of the _getColor function set during object instantiation
 * @param {Event} eventObj
 * @method
 * @private
 */
Object.defineProperty(BlockCanvas.prototype, "setColor", {
    value : function(eventObj) {
    eventObj.target.className = this._getColor();
    },
    writable : false,
    enumerable : false,
    configurable : false
});

