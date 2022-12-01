var canvas = document.getElementById('canvasId');
var ctx = canvas.getContext('2d');

var sideMenu = document.getElementById('sidemenuId');
var sidemenuVisible = false;
var colorpicker = document.getElementById('colorpicker');
var lineWidth = document.getElementById('lineWidth');
var canvasWidth = document.getElementById('canvasWidth');
var canvasHeight = document.getElementById('canvasHeight');

var uploadCon = document.getElementById('uploadconId');
var uploadConVisible = false;
var uploadImage = document.getElementById('imageInput');

var coord = {x:0, y:0}; 
var paint = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 64;

canvasWidth.value = canvas.width;
canvasHeight.value = canvas.height;

sideMenu.style.height = window.innerHeight - 64 + "px";

document.addEventListener('mousedown', startPainting);
document.addEventListener('mouseup', stopPainting);
document.addEventListener('mousemove', sketch);
window.addEventListener('resize', resize);
canvasWidth.addEventListener('input', updateWidth);
canvasHeight.addEventListener('input', updateHeight)

function applyImage(e) {
  if(e.target.files) {
    var imageFile = e.target.files[0];
    var reader = new FileReader();

    console.log("File: " + imageFile);

    reader.readAsDataURL(imageFile);
    reader.onloadend = function(e) {
      var myImage = new Image();

      myImage.src = e.target.result;
      myImage.onload = function(ev) {
        canvas.width = myImage.width;
        canvas.height = myImage.height;
        ctx.drawImage(myImage, 0, 0);
      }
    }
  }
}

function updateWidth(e) {
  canvas.style.width = e.target.value + 'px';
}

function updateHeight(e) {
  canvas.style.height = e.target.value + 'px';
}

function resize() {
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight - 64 + 'px';

  canvasWidth.value = canvas.width;
  canvasHeight.value = canvas.height;

  sideMenu.style.height = window.innerHeight - 64 + "px";
}

function clearCanvas() {
  if(sidemenuVisible || uploadConVisible) return

  var isConfirm = confirm("Do you really want to clear the canvas?");

  if(isConfirm) ctx.clearRect(0, 0, canvas.width, canvas.height)
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