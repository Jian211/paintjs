const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");

let paintingStatus = "false";

canvas.Width = 800;
canvas.height= 800;
ctx.strokeStyle = "black";
ctx.lineWidth = "2.5";


//Drowing event
if(canvas){
    canvas.addEventListener("mousedown", () => paintingStatus = true );
    canvas.addEventListener("mouseup", () => paintingStatus = false);
    canvas.addEventListener("mousemove", onMouseMove);
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    
    if(paintingStatus === false){    
        ctx.beginPath();
        ctx.moveTo(x,y);   
    }
    if(paintingStatus === true){
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}


// Color change
const cgColor = document.querySelector("#jsColors");

cgColor.addEventListener("click",getColorValue);
function getColorValue(event){
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = event.target.style.backgroundColor;
    fill.style.borderColor = ctx.fillStyle;
}

// Fill background
const fill = document.querySelector("#jsMode");

fill.addEventListener("click", fillTheBg);
function fillTheBg(){
    ctx.fillRect(0,0,canvas.Width,canvas.height);
}
