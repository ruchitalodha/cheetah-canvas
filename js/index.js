
function cheetahCanvas () {
  var letsdraw = false;
  var upArrowClicked = false;
  var canvas = document.getElementById("canvas");
  var colorPicker = document.getElementById("colorpicker");
  var aspectRatio = 0.8;
  var brushSize = 30;
  var {w, h} = calculateCanvasSize(window.innerWidth, window.innerHeight);
  canvas.width = w;
  canvas.height = h;

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
  var isMobileDevice = window.innerWidth < 700
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

  function calculateCanvasSize(width, height) {
    return {
      w: (width * aspectRatio).toFixed(0),
      h: (height * aspectRatio).toFixed(0)
    }
  }



  //On load set the keybindings of document and the mousemove action.
  document.onmousemove = onMouseMove();
  colorPicker.addEventListener("change", function (e) {
    ctx.fillStyle = e.target.value;
  });

  //Keep checking for isMobileDevice;
  function handleDeviceResize() {
    isMobileDevice = window.innerWidth < 700;
  }

  //On resize get the device type
  window.addEventListener("resize", handleDeviceResize);

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
    window.addEventListener("orientationchange", function() {
      // After orientationchange, add a one-time resize event
      setTimeout(function(){
        var {w, h} = calculateCanvasSize(window.innerWidth, window.innerHeight);
        canvas.width = w;
        canvas.height = h;
        ctx.clearRect(0, 0, w, h);
      },300);
    });
  }
}

cheetahCanvas()
