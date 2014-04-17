/**
 * @projectDescription implementation of a simple color picker tool bar.
 * Implement inheritance using ECMA5 methods
 * @see https://developer.mozilla.org/en/JavaScript/Guide/Inheritance_Revisited
 * @author aaronTurecki
 * @version $Revision: 761 $
 * $Date: 2013-11-20 10:50:59 -0800 (Wed, 20 Nov 2013) $
 */

/*
 * @classDescription Palette A simple "object type" encapsulating a color picker toolbar
 * @param {HTMLElement} container - the destination container of the palette
 * @return {Palette}
 * @constructor
 */
function Palette(container) {
    "use strict";
	var colors =[["blank", "red", "blue", "green", "black", "yellow"]];
	// colors is a created as a multidimensional array with only a single
	// row to be compatible with the ClickGrid Constructor
	Object.defineProperty(this, "colors", {
		value : colors,
		writable : false,
		enumerable : false,
		configurable : false
	});

	Object.defineProperty(this, "currentColor", {
		value : "blank",
		writable : true,
		enumerable : false,
		configurable : false
	});

    Object.defineProperty(this, "activeCell", {
        writable : true,
        enumerable : false,
        configurable : false
    });


    //Following invokes the ClickGrid Constructor but uses the current object
	//(i.e. Palette) as "this" - indicated by the first parameter.  The remaining
	//parameters are passed to the ClickGrid Constructor
	ClickGrid.call(this, container, 1, this.colors[0].length, "palette", this.storeColor.bind(this), this.colors);

    //Added to make explicit the constructor role of the current function
	return this;
}
// Following sets the current objects prototype to an instance of its parents prototype
Palette.prototype = Object.create(ClickGrid.prototype);


Palette.prototype.storeColor = function(eventObj) {
    if(this.activeCell){
        this.activeCell.classList.toggle("active");
    }
    this.currentColor = eventObj.target.className;
    this.activeCell = eventObj.target;
    this.activeCell.classList.toggle("active");
};

Object.defineProperty(Palette.prototype, "getColor", {
    value : function() {
        return this.currentColor;
    },
    writable : false,
    enumerable : false,
    configurable : false
});