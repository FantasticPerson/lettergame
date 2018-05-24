var time;
var score = 0;
var msec = 70;
var highest = 550;
var numberLength = 5;
var letter = new Array("Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "X", "C", "V", "B", "N", "M");
var InitTop = 10;
var evenAddScroe = 10;
var num1, num2, num3, num4, num5;
var letterArr = []
var letterConArr = []
var speed = 2
var scoreCon = document.getElementsByClassName('score-container')[0]
var startBtn = document.getElementsByClassName('start-btn')[0]
for(var i=0;i<numberLength;i++){
    letterConArr.push(document.getElementsByClassName('letter'+(i+1))[0])
}

startBtn.onclick = function(){
    clearInterval(time);
    for(var i=0;i<numberLength;i++){
        letterConArr[i].style.top = InitTop+'px'
    }
    msec = 70;
    start()

    startBtn.innerText = "重新开始";
}

function start() {
    score = 0;
    speed = 2;
    scoreCon.innerHTML = score;
    if(time) clearInterval(time);
    time = setInterval("move()", msec);
    document.onkeydown = keydown;
}

function move() {
    letterArr = []
    for(var i=0;i<numberLength;i++){
        letterArr.push(parseInt(Math.random() * 26))
    }	

    for(var i=0;i<numberLength;i++){
        var styleTop = parseInt(letterConArr[i].style.top.replace('px',''));
        if(styleTop == InitTop){
            letterConArr[i].innerHTML = letter[letterArr[i]];
        }
        if (styleTop < highest) {
            letterConArr[i].style.top = styleTop + speed+'px';
        } else {
            clearInterval(time);
            startBtn.innerText = "开始";
            gameOver(score)
            break;
        }
    }
}

function keydown(e) {
    var KeyName = String.fromCharCode(e.which);	
    for(var i=0;i<numberLength;i++){
        if(letterConArr[i].innerHTML == KeyName){
            letterConArr[i].style.top = InitTop + 'px'
            letterConArr[i].innerHTML = letter[letterArr[i]]
            addScroe();
            break;
        }
    }	
}

function addScroe() {
    score += evenAddScroe;
    if(score > 100 && score < 400){
        speed = 4
    } else if(score >= 400 && score < 800){
        speed = 8
    } else if(score >= 800) {
        speed = 16
    }
    scoreCon.innerHTML = score;
}

function restart() {
    clearInterval(time);
    for(var i=0;i<numberLength;i++){
        letterConArr[i].style.top = InitTop+'px'
    }
    msec = 70;
    start();
}
