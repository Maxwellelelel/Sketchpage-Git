var canvas = document.getElementById("canvasId");
var ctx = canvas.getContext("2d");
var sideMenu = document.getElementById('sidemenuId');
 
var sidemenuVisible = false;
var mouseX = 0;
var mouseY = 0;
 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 64;
 
sideMenu.style.height = (window.innerHeight - 64) + "px";
 
console.log("Width: " + sideMenu.style.height);
 
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 64;
 
    sideMenu.style.height = (window.innerHeight - 64) + "px";
})
 
canvas.addEventListener('onmousedown', function(event) {
    ctx.fillStyle = "#FF0000";
 
    console.log("X: " + event.clientX);
    console.log("Y: " + event.clientY);
 
    ctx.fillRect(event.clientX, event.clientY, 10, 10);
})
 
function changeMenu(obj) {
 
    obj.classList.toggle("change");
 
    if(sidemenuVisible) {
        sideMenu.style.left = "-248px";
        sidemenuVisible = false;
 
    } else {
        sideMenu.style.left = "0px";
        sidemenuVisible = true;
    }
   
    sideMenu.style.transition = "0.3s";
 
}