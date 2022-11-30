var canvas = document.getElementById('canvasId');
var ctx = canvas.getContext('2d');

var sideMenu = document.getElementById('sidemenuId');
var sidemenuVisible = false;
var colorpicker = document.getElementById('colorpicker');
var lineWidth = document.getElementById('lineWidth');

var uploadCon = document.getElementById('uploadconId');
var uploadConVisible = false;

var coord = {x:0, y:0}; 
var paint = false;

resize();

document.addEventListener('mousedown', startPainting);
document.addEventListener('mouseup', stopPainting);
document.addEventListener('mousemove', sketch);
window.addEventListener('resize', resize);

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 64;

  sideMenu.style.height = window.innerHeight - 64 + "px";
}

function clearCanvas() {
  if(sidemenuVisible || uploadConVisible) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function hideUploadcon() {
  if(uploadConVisible) {
    uploadCon.style.opacity = "0.0"
    uploadCon.style.top = "-256px"
    uploadCon.style.transition = "0.3s";

    canvas.style.opacity = "1.0";
    canvas.style.transition = "0.3s";

    uploadConVisible = false;
  }
}

function showUploadcon() {
  if(!uploadConVisible) {
    uploadCon.style.opacity = "1.0";
    uploadCon.style.top = "40%"
    uploadCon.style.transition = "0.3s";

    canvas.style.opacity = "0.3";
    canvas.style.transition = "0.3s";

    uploadConVisible = true;
  }
}

function downloadCanvas() {
  if(uploadConVisible) return;

  let dataURL = canvas.toDataURL();
  let anchor = document.createElement('a');

  anchor.href = dataURL;
  anchor.download = "canvas-to-image";
  anchor.click();
}

function uploadImage(event) {
  var reader = new FileReader();

  reader.onload = function(event) {
      var img = new Image();

      img.onload = function() {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
      }

      img.src = event.target.result;
  }

  reader.readAsDataURL(event.target.files[0]);  
}

function getPosition(event) {
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}

function getPencilColor() {
  return colorpicker.value;
}

function getPencilWidth() {
  return lineWidth.value;
}

function startPainting(event) {
  paint = true;

  getPosition(event);
}

function stopPainting() {
  paint = false;
}
    
function sketch(event) {
  if (!paint || sidemenuVisible || uploadConVisible) return;

  ctx.beginPath();

  ctx.lineWidth = getPencilWidth()
  ctx.lineCap = 'round';
  ctx.strokeStyle = getPencilColor()

  ctx.moveTo(coord.x, coord.y);

  getPosition(event);
   
  ctx.lineTo(coord.x , coord.y);
  ctx.stroke();
}

function changeMenu(obj) {
  if(!uploadConVisible) {
    obj.classList.toggle("change");
 
    if(sidemenuVisible) {
        sideMenu.style.left = "-230px";
        sidemenuVisible = false;
        canvas.style.opacity = "1.0";
 
    } else {
        sideMenu.style.left = "0px";
        sidemenuVisible = true;
        canvas.style.opacity = "0.3";
    }
   
    sideMenu.style.transition = "0.3s";
    canvas.style.transition = "0.3s";
  }
}