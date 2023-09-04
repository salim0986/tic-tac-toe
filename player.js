//Constants & variables
const spans = document.querySelectorAll("span");
const winContainer = document.querySelector(".winContainer");
const board = document.querySelector(".boardContainer");
const submit = document.querySelector("button");
const container = document.querySelector(".container");
const btn = document.querySelector(".btn");
const h1 = winContainer.children[0];
const h2 = winContainer.children[1];

const form = document.querySelector(".playerForm");
const playerInput = document.querySelectorAll("input");

let p1 = [];
let p2 = [];
let die = true;

//Event listeners
spans.forEach((elem) => {
  elem.addEventListener("click", spanClick);
});

btn.addEventListener("click",()=>{
  p1=[];
  p2=[];
  spans.forEach(elem=>elem.innerHTML="");
  board.style.display = "grid";
  winContainer.style.display = "none";
});

playerInput.forEach((elem) => {
  elem.addEventListener("keyup", () => {
    if (playerInput[0].value != "" && playerInput[1].value!=""){
      submit.addEventListener("click",submitAction);
      form.children[2].style.backgroundColor = "rgb(1, 100, 26)";
    }
         else form.children[2].style.backgroundColor = "grey";
    });
  });




//Functions for different actions
function difference(a, b) {
  return Math.abs(a - b);
}

function spanClick() {
  let value = this.getAttribute("val");
  if (this.children.length == 0) {
    if(die){
    p1.push(Number(value));
    let cross = document.createElement("img");
    cross.setAttribute("src","./Images/cross.png");
    this.append(cross);
    if(numMatch(p1)){
      numMatchAction(p1)
    }
    if (p1.length > 2) {
      p1.shift();
    }
    die = false;
  }else{
    p2.push(Number(value));
    let circle = document.createElement("img");
    circle.setAttribute("src","./Images/circle.png");
    this.append(circle);
    if(numMatch(p2)){
      numMatchAction(p2)
    }
    if (p2.length > 2) {
      p2.shift();
    }
    die = true;
  }
  }
  if(numMatch(p1))numMatchAction(p1)
  else if(numMatch(p2))numMatchAction(p2)
  else if(Array.from(spans).every(e=>e.children.length!=0))fullAction();
}

function numMatchAction(arr){
  if(arr == p1) h1.innerText = `Congratulation! ${playerInput[0].value}`;
  else h1.innerText = `Congratulation! ${playerInput[1].value}`;
  h2.innerText = "You are the winner"
  setTimeout(()=>{
    board.style.display = "none";
    winContainer.style.display = "flex";
  },200)
}

function fullAction(){
  h1.innerText = "Ohh No!";
  h2.innerText = "It's a TIE."
  setTimeout(() => {
    board.style.display = "none";
    winContainer.style.display = "flex";
  }, 200);
}

function submitAction(){
  if(window.getComputedStyle(form).display != "none"){
    form.style.display = "none";
    container.style.display = "flex";
    }else{
    form.style.display = "none";
    container.style.display = "flex";
    }
}

function numMatch(arr) {
  let sec = arr.sort(function (a, b) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  });
  let [a, b, c] = sec;
  if (difference(a, b) == 1 && difference(b, c) == 1) {
    if(a==1 || a==4 || a==7){
      return true;
    }
    return false;
  } else if (difference(a, b) == 2 && difference(b, c) == 2) {
    return true;
  } else if (difference(a, b) == 3 && difference(b, c) == 3) {
    if(a==1 || a==2 || a==3){
      return true;
    }
    return false;
  } else if (difference(a, b) == 4 && difference(b, c) == 4) {
    return true;
  } else return false;
}
