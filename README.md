swipeevent.js
=============

Listen to swipe events on DOM objects.

#### Adding the swipe functionality
Using the SWIPE function, new mathods and attributes will be added to this element for easy access. 
```JS
var elementWithSwipeMethods = SWIPE("wrapper");
```


#### Chain function calls together
Since all methods return the original element, you can easily chain function calls together. 
```JS
SWIPE("someElementId")
  .onSwipe('left', function(){
    // When swipeing to the left
  })
  .onSwipe('right' function(){
    // When swipeing to the right
  })
  .onSwipe('up', function(){
    // When swipeing up
  })
  .onSwipe('down' function(){
    // When swipeing down
  })
  .onSwipe('swipeing', function(){
    // This will be triggered while moving during the swipe.
  })
  .dispatchOnRelease(false)
  .setSensitivity(50);
```
