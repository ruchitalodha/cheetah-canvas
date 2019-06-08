var letsdraw = false;
var upArrowClicked = false;
var canvas = document.getElementById("canvas");
var colorPicker = document.getElementById("colorpicker");
var w = canvas.width = window.innerWidth * 0.8;
var h = canvas.height = window.innerHeight * 0.8;
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

function getMousePos(event) {
  return {
    x: event.clientX - canvas.offsetLeft - 20,
    y: event.clientY - canvas.offsetTop - 20,
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
      ctx.fillRect(mousePos.x, mousePos.y, 40, 40);
    }
  });
}

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
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

if (!isMobileDevice()) {
  callKeyBindingEvents();
}
else {
  window.addEventListener("orientationchange", function() {
  ctx.clearRect(0, 0, w, h);
  }, false);
}
