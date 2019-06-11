var letsdraw = false;
var upArrowClicked = false;
var canvas = document.getElementById("canvas");
var colorPicker = document.getElementById("colorpicker");
var aspectRatio = 0.8;
var brushSize = 40;
var w = canvas.width = getDeviceDimensions().w * aspectRatio;
var h = canvas.height = getDeviceDimensions().h * aspectRatio;
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'red';
var currentX = '';
var currentY = '';
var keycodes = {
  66: "blue",
  71: "green",
  89: "yellow",
  82: "red",
};
var isMobileDevice = getDeviceDimensions().w < 700
function getMousePos(event) {
  return {
    x: event.clientX - canvas.offsetLeft - brushSize/2,
    y: event.clientY - canvas.offsetTop - brushSize/2,
  };
}

function onMouseMove() {
  canvas.addEventListener("mouseenter", function (e) {
    letsdraw = true;
  });

  canvas.addEventListener("mousemove", function (e) {
    var mousePos = getMousePos(e);
    currentX = mousePos.x;
    currentY = mousePos.y;
    if (letsdraw && !upArrowClicked) {
      ctx.fillRect(mousePos.x, mousePos.y, brushSize, brushSize);
    }
  });
}

function getDeviceDimensions() {
  return {
    w: window.innerWidth,
    h: window.innerHeight
  }
}

function callKeyBindingEvents() {
  document.addEventListener('keyup', function (e) {
    //If the key is spacebar clear canvas;
    e.preventDefault();
    if (e.keyCode == 32) {
      ctx.clearRect(0, 0, w, h);
      colorPicker.click();
    }

    //Up arrow to stop drawing
    if (e.keyCode == 38) {
      upArrowClicked = true;
    }

    //Down arrow to start drawing
    if (e.keyCode == 40) {
      upArrowClicked = false;
    }

    //If key is b/g/y/r then change the stroke to respective keycode
    //and then make a stroke on the current position
    else if ([66, 71, 89, 82].includes(e.keyCode)) {
      ctx.fillStyle = keycodes[e.keyCode];
      ctx.fillRect(currentX, currentY, 40, 40);
    }
  });
}

//On load set the keybindings of document and the mousemove action.
document.onmousemove = onMouseMove();
colorPicker.addEventListener("change", function (e) {
  ctx.fillStyle = e.target.value;
});

//On resize get the device type
window.addEventListener("resize", onResizeFunction);
function onResizeFunction (e){
  isMobileDevice = getDeviceDimensions() < 700
}

if (!isMobileDevice) {
  document.addEventListener('keyup', function (e) {
    //If the key is spacebar clear canvas;
    e.preventDefault();
    if (e.keyCode == 32) {
      ctx.clearRect(0, 0, w, h);
      colorPicker.click();
    }

    //Up arrow to stop drawing
    if (e.keyCode == 38) {
      upArrowClicked = true;
    }

    //Down arrow to start drawing
    if (e.keyCode == 40) {
      upArrowClicked = false;
    }

    //If key is b/g/y/r then change the stroke to respective keycode
    //and then make a stroke on the current position
    else if ([66, 71, 89, 82].includes(e.keyCode)) {
      ctx.fillStyle = keycodes[e.keyCode];
      ctx.fillRect(currentX, currentY, brushSize, brushSize);
    }
  });
}
else {
  console.log(getDeviceDimensions(), w, h);
  window.addEventListener("orientationchange", function() {
  w = canvas.width = getDeviceDimensions().w * aspectRatio;
  h = canvas.height = getDeviceDimensions().h * aspectRatio;
  // ctx.clearRect(0, 0, w, h);
  console.log('or change', getDeviceDimensions(), w, h);
}, true);
}
