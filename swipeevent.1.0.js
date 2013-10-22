 /* made by Adam Ringhede */

(function(window){
var SWIPE = function(a_ele) {
	var d_ele = getElmnt(a_ele);
    if (d_ele.onSwipe) return;
    function executeArray(a, arg) {
        for (var i = 0, l = a.length; i < l; i++) {
            if (typeof a[i] === "function" || typeof a[i] === "object") a[i].call(window,arg);
        }
    }
	function getEventFunctions(a_direction){
		switch (a_direction) {
        case "up":
            return d_ele._up;
            break;
        case "right":
            return d_ele._right;
            break;
        case "down":
            return d_ele._down;
            break;
        case "left":
            return d_ele._left;
            break;
		case "swipeing":
            return d_ele._onswipeing;
            break;
        };
	}
	function getElmnt(a_el){
		var r_elmnt;
		if(typeof a_el === "string"){ 
		r_elmnt = window.document.getElementById(a_el);
			if(r_elmnt === null){ 
				throw a_el + " could not be found in the document.";
				return;
			}
		} else { 
			r_elmnt = a_el;
		}
		return r_elmnt;
	}
    d_ele._up = new Array();
    d_ele._right = new Array();
    d_ele._down = new Array();
    d_ele._left = new Array();
    d_ele._sensitivity = 10;
    d_ele._onswipeing = new Array();
	
	var startX, stopX, startY, stopY; // Coordinates
	var _shouldDispatchOnRelease = false;
	var _startTime;

    function swipeHandler(e) {
		e.timeFromStart = e.timeStamp - _startTime;
		e.distanceMoved = {x:e.pageX - startX, y:e.pageY - startY}
        if (isNaN(startX) || startX === "a") return;
        stopX = e.pageX;
        stopY = e.pageY;
        executeArray(d_ele._onswipeing, e);
        stopX -= startX;
        stopY -= startY;
        var length;
        if (stopX === 0) length = stopY;
        else if (stopY === 0) length = stopX;
        else {
            length = Math.sqrt(stopX * stopX + stopY * stopY);
        }
        if (length < 0) length * -1;
        if (length < d_ele._sensitivity) {
            return;
        }
        if (stopY < 0) {
            if (stopX > 0) {
                if (stopX + stopY > 0) executeArray(d_ele._right, e); //Right
                else executeArray(d_ele._up, e); //Up
            } else {
                if (stopX - stopY < 0) executeArray(d_ele._left, e); //Left
                else executeArray(d_ele._up, e); //Up
            }
        } else {
            if (stopX > 0) {
                if (stopX - stopY > 0) executeArray(d_ele._right, e); //Right
                else executeArray(d_ele._down, e); //Down
            } else {
                if (stopX + stopY < 0) executeArray(d_ele._left, e); //Left
                else executeArray(d_ele._down, e); //Down
            }
        }
        startX = "a";
    }
	
    d_ele.onSwipe = function(direction, fn, bool) {
		getEventFunctions(direction).push(fn);
		function onDown(e){
			_startTime = e.timeStamp;
            startX = e.pageX;
            startY = e.pageY;
		}
		// Down
        d_ele.onmousedown = function(e) {
			onDown(e);
        };
		d_ele.ontouchdown = function(e) {
			onDown(e);
        };
		
		if(bool !== null) _shouldDispatchOnRelease = bool;
		if ( _shouldDispatchOnRelease ){
			d_ele.dispatchOnRelease(true);
		} else {
			d_ele.dispatchOnRelease(false);
		}
        return d_ele;
    };
	/** If bool = true, then fire event on mouseup/touchup, and not while still moving. Default is false.
	 */
	d_ele.dispatchOnRelease = function(bool){
		if(bool){
			d_ele.onmousemove = null;
			d_ele.ontouchmove = null;
			d_ele.onmouseup = function(e) {
				swipeHandler(e);
            	startX = "a"; // To prevent event from triggering without swipe.
       		};
			d_ele.ontouchup = function(e) {
				swipeHandler(e);
            	startX = "a"; // To prevent event from triggering without swipe.
        	};
		} else {
			d_ele.onmousemove = swipeHandler;
			d_ele.ontouchmove = swipeHandler;	
			d_ele.onmouseup = function() {
            	startX = "a"; // To prevent event from triggering without swipe.
      		};
			d_ele.ontouchup = function() {
				startX = "a"; // To prevent event from triggering without swipe.
        	};
		}
		return d_ele;
	}; 
    /** Remove listeners. Which one can be specified, if none is specified everyone will. 
     */
    d_ele.removeSwipeListener = function() {
        if (arguments.length === 0) {
            d_ele._up = new Array();
            d_ele._right = new Array();
            d_ele._down = new Array();
            d_ele._left = new Array();
            d_ele._onswipeing = new Array();
        }
        for (var i = 0, l = arguments.length; i < l; i++) {
			getEventFunctions(arguments[i]).length = 0;
        }
	    return d_ele;
    };
    /** The sensitivity is the amount of pixels the cursor needs to move
     * in either direction before the event is triggered. Default is 10. 
     * Less than 10 and the user may experience unexpected results.
     */
    d_ele.setSensitivity = function(sens) {
        d_ele._sensitivity = sens;
        return d_ele;
    };
    /** Set the function that should be called when the user is swipeing.
     */
    d_ele.onSwipeing = function(a_fn) {
        d_ele._onswipeing[d_ele._onswipeing.length] = a_fn;
        return d_ele;
    };
	d_ele.dispatchEvent = function(a_ev) {
        executeArray(getEventFunctions(a_ev), e);
        return d_ele;
    };
    return d_ele;
};
window.SWIPE = SWIPE; 
})(window);


/*  Release notes 1.1

dispatchOnRelease(bool)
	If bool = true, then fire event on mouseup/touchup, and not while still moving. Default is false.
	Additional argument for onSwipe is a boolean which overwrites the _shouldDispatchOnRelease with said boolean;
	
	
Initialization by id
	You can now insert either a DOM element or an element's ID in the SLIDE() method.

*/
