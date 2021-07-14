const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");

let paintingStatus = false;
const savedLinesData = []; 
let savedLines = [];

canvas.Width = 320;
canvas.height= 460;
ctx.strokeStyle = "black";
ctx.lineWidth = "2.5";

//Drowing event
if(canvas){
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup",handleMouseUp );
    canvas.addEventListener("mousemove", onMouseMove);
}
function handleMouseDown(){ paintingStatus = true; }

function handleMouseUp(){
    paintingStatus = false;

    savedLinesData.push(savedLines);
    savedLines = [];
}

const backBtn = document.querySelector("#jsBack");

backBtn.addEventListener("click", handleBack);

function handleBack(){
    savedLinesData.push(savedLines);
    console.log("savedLinesData =",savedLinesData);
   // console.log(savedLinesData)
   // console.log(savedLinesData.pop());
}



function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    
    if(paintingStatus === false){    
        ctx.beginPath();
        ctx.moveTo(x,y);   
    }
    if(paintingStatus === true){
        savedLines.push({"x":x ,"y":y});
        console.log("savedLines = ",savedLines);
        

        ctx.lineTo(savedLines[savedLines.length-1].x,savedLines[savedLines.length-1].y);
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


//save 
const saveBtn = document.querySelector("#jsSave");

saveBtn.addEventListener("click",handleSave);
function handleSave(event){
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = `img01`;
    link.click();
}

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
    ctx.lineTo(x,y);
    ctx.stroke();
    console.log();
}

function touchEnd(event){
    event.preventDefault();
    ctx.closePath();
    touchMode = false;
}