var canvas = document.getElementById('canvasId');
var ctx = canvas.getContext('2d');

var sideMenu = document.getElementById('sidemenuId');
var sidemenuVisible = false;

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

function getPosition(event) {
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}

function startPainting(event) {
  paint = true;

  getPosition(event);
}

function stopPainting() {
  paint = false;
}
    
function sketch(event) {
  if (!paint || sidemenuVisible) return;

  ctx.beginPath();

  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';

  ctx.moveTo(coord.x, coord.y);

  getPosition(event);
   
  ctx.lineTo(coord.x , coord.y);
  ctx.stroke();
}

function changeMenu(obj) {
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