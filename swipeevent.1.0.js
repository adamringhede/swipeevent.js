/* made by Adam Ringhede */

(function(window){
var SWIPE = function(a_ele) {
    if (a_ele.onSwipe) return;
    var d_ele = a_ele;
    function executeArray(a, arg) {
        for (var i = 0, l = a.length; i < l; i++) {
            if (typeof a[i] === "function" || typeof a[i] === "object") a[i].call(window,arg);
        }
    }
    d_ele._up = new Array();
    d_ele._right = new Array();
    d_ele._down = new Array();
    d_ele._left = new Array();
    d_ele._sensitivity = 10;
    d_ele._onswipeing = new Array();
    d_ele.onSwipe = function(direction, fn) {
        var startX, stopX, startY, stopY; // Coordinates

        function swipeHandler(e) {
            if (isNaN(startX) || startX === "a") return;
            stopX = e.pageX;
            stopY = e.pageY;
            executeArray(d_ele._onswipeing, e)
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
            stopX = "a";
            startX = "a";
            stopY = "a";
            startY = "a";
        }
        switch (direction) {
        case "up":
            d_ele._up[d_ele._up.length] = fn;
            break;
        case "right":
            d_ele._right[d_ele._right.length] = fn;
            break;
        case "down":
            d_ele._down[d_ele._down.length] = fn;
            break;
        case "left":
            d_ele._left[d_ele._left.length] = fn;
            break;
        };
        d_ele.onmousedown = function(e) {
            startX = e.pageX;
            startY = e.pageY;
        };
	d_ele.ontouchdown = function(e) {
            startX = e.pageX;
            startY = e.pageY;
        };
        d_ele.onmouseup = function() {
            startX = "a"; // To prevent event from triggering without swipe.
        };
	d_ele.ontouchup = function() {
            startX = "a"; // To prevent event from triggering without swipe.
        };
        d_ele.onmousemove = swipeHandler;
	d_ele.ontouchmove = swipeHandler;
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
            switch (arguments[i]) {
            case "up":
                d_ele._up = new Array();
                break;
            case "right":
                d_ele._right = new Array();
                break;
            case "down":
                d_ele._down = new Array();
                break;
            case "left":
                d_ele._left = new Array();
                break;
            case "slideing":
                d_ele._onswipeing = new Array();
                break;
            };
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
    /** Set a function that should be called when the user is swipeing.
     */
    d_ele.onSwipeing = function(f) {
        d_ele._onswipeing[d_ele._onswipeing.length] = f;
        return d_ele;
    };
    return d_ele;
};
window.SWIPE = SWIPE; 
})(window);
