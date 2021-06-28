const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");

let paintingStatus = false;

canvas.Width = 320;
canvas.height= 460;
ctx.strokeStyle = "black";
ctx.lineWidth = "2.5";


//handle touch
let touchMode = false;

canvas.addEventListener("touchstart",touchstart);
canvas.addEventListener("touchmove", touching);
canvas.addEventListener("touchend",touchEnd);
//start touch mode
function touchstart(){
    touchMode = true;
    ctx.beginPath();    
}

function touching(event){
    event.preventDefault();

    const x = event.changedTouches[0].pageX; 
    const y = event.changedTouches[0].pageY;
    console.log(event.changedTouches[0])
    ctx.lineTo(x,y);
    ctx.stroke();
    console.log();
}

function touchEnd(event){
    event.preventDefault();
    ctx.closePath();
    touchMode = false;
}


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

//change brush
const brush = document.querySelector("#jsRange");

brush.addEventListener("input", handleRange);

function handleRange(event){
    ctx.lineWidth = event.target.value; 
}