const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor")
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");


canvas.width = 800;
canvas.height = 800;

ctx.fillStyle = "white"
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "black";
ctx.strokeStyle = "black";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;    
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseUp(){
    painting = false;
}
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleFillCanvas(){
    if(filling === true){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
function handleCM(event){
    event.preventDefault();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleFillCanvas);
    canvas.addEventListener("contextmenu", handleCM);
}    
colors.forEach( color => 
    color.addEventListener("click", handleColorClick)
);

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}
 
function handleRagneChange(event){
    ctx.lineWidth = event.target.value;
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "img01";
    link.click();
}

if(range){
    range.addEventListener("input", handleRagneChange);
}

mode.addEventListener("click", handleModeClick);

saveBtn.addEventListener("click", handleSaveClick);