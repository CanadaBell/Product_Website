// All this code is from stack overflow
// https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily?page=1&tab=scoredesc#tab-top
// I know how it works, just I didn't code it


function disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

function enableScrolling(){
    window.onscroll=function(){};
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};
function preventDefault(e) {
    e.preventDefault();
}
  
function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
}
  
// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function () { supportsPassive = true; } 
    }));
} catch(e) {}
  
var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
  
 // call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}
  
// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}


// Runs everything here once page loads
window.onload = function() { 
    var overlay = document.getElementById('overlay')
    var imgOverlay = document.getElementById('img-overlay')

    document.getElementById('close').onclick = function(){
        overlay.style.display = 'none'
        enableScrolling()
        enableScroll()
    }

    document.getElementById('img-close').onclick = function(){
        imgOverlay.style.display = 'none'
    }

    document.getElementById('pImg').onclick = function() {
        biggerImg(document.getElementById('pImg').src)
    }

    // Shows the second window
    function biggerImg(imgPath) {
        imgOverlay.style.display = 'block'
        document.getElementById('bigger-img').src = imgPath
    }
}


// Shows the first window
function showOverlay(lookupNum) {
    overlay.style.display = 'block'
    document.getElementById('product-name').innerHTML = products[lookupNum].name
    document.getElementById('model-number').innerHTML = products[lookupNum].model
    document.getElementById('price').innerHTML = products[lookupNum].price
    document.getElementById('description').innerHTML = products[lookupNum].description
    document.getElementById('pImg').src = 'img/' + products[lookupNum].filename
    disableScrolling()
    disableScroll()
}

// Creates all the elements with products

let pNum = 0
for (let i = 0; i < 6; i ++) {
    const lookupNum = pNum

    // Holds img and text
    var myCol = document.createElement('div')
    myCol.className = 'product'
    document.getElementById('product-page').appendChild(myCol)

    // Product img
    var myImg = document.createElement('img')
    myImg.src = 'img/' + products[pNum].filename
    myCol.appendChild(myImg)

    // Product text
    var myText = document.createElement('div')
    myText.className = 'p-name'
    myText.innerHTML = products[pNum].name
    myCol.appendChild(myText)

    // Checks if the img has been clicked
    myImg.onclick = function(){showOverlay(lookupNum)}

    pNum ++
}

