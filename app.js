const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor")
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

let painting = false;
let filling = false;

canvas.width = 800;
canvas.height = 800;

ctx.fillStyle = "white"
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "black";
ctx.strokeStyle = "black";
ctx.lineWidth = 2.5;


function stopPainting(){    painting = false;   }
function startPainting(){    painting = true;   }

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;    
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else { 
        ctx.lineTo(x,y);
        ctx.stroke();
        lineStep(x,y);
    }
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


// DeleteBtn
const deleteBtn = document.querySelector("#jsDelete");
deleteBtn.addEventListener("click",handleDeleteScreen);
function handleDeleteScreen(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


//back 1step
const backBtn = document.querySelector("#jsBack");

let lineStepsArr = [];
let lineSteps = [];

backBtn.addEventListener("click",beforeLine);
function beforeLine(){
    // 저장소에서 스트링을 들고온다
    // 스트링을 어레이로 변환한다.
    // 변환 후 POP을 이용하여 화면에 표시한다.
}

function lineStep(x,y){
    lineSteps.push({"X" :x, "Y":y});
}

//드로잉 정보를 어레이 객체에 저장하기
canvas.addEventListener("mouseup",savedLine);
function savedLine(){
    lineStepsArr.push(lineSteps);

// 왜 배열이 연결되서 저장되는가 

    localStorage.setItem("xyVAlUE",JSON.stringify(lineStepsArr));

    console.log(lineStepsArr);
}