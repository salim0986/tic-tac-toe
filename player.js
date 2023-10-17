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

let spansArr = Array.from(spans);
let die = true;

//Event listeners
spans.forEach((elem) => {
  elem.addEventListener("click", spanClick);
});

btn.addEventListener("click", () => {
  spans.forEach((elem) => (elem.innerHTML = ""));
  board.style.display = "grid";
  winContainer.style.display = "none";
});

playerInput.forEach((elem) => {
  elem.addEventListener("keyup", () => {
    if (playerInput[0].value != "" && playerInput[1].value != "") {
      submit.addEventListener("click", submitAction);
      form.children[2].style.backgroundColor = "rgb(1, 100, 26)";
    } else form.children[2].style.backgroundColor = "grey";
  });
});

//Functions for different actions

function spanClick() {
  let value = this.getAttribute("val");
  if (this.children.length == 0) {
    if (die) {
      let cross = document.createElement("img");
      cross.setAttribute("src", "./Images/cross.png");
      this.append(cross);
      this.setAttribute("brand", "x");
      die = false;
    } else {
      let circle = document.createElement("img");
      circle.setAttribute("src", "./Images/circle.png");
      this.append(circle);
      this.setAttribute("brand", "o");
      die = true;
    }
  }
  if (numMatch()) {
    const winner = numMatch();
    if (winner == "x") numMatchAction("player1");
    else numMatchAction("player2");
  } else if (spansArr.every((e) => e.children.length != 0)) fullAction();
}

function numMatchAction(winner) {
  if (winner == "player1")
    h1.innerText = `Congratulation! ${playerInput[0].value}`;
  else h1.innerText = `Congratulation! ${playerInput[1].value}`;
  h2.innerText = "You are the winner";
  spansArr.forEach((e) => e.removeAttribute("brand"));
  setTimeout(() => {
    board.style.display = "none";
    winContainer.style.display = "flex";
  }, 200);
}

function fullAction() {
  h1.innerText = "Ohh No!";
  h2.innerText = "It's a TIE.";
  spansArr.forEach((e) => e.removeAttribute("brand"));

  setTimeout(() => {
    board.style.display = "none";
    winContainer.style.display = "flex";
  }, 200);
}

function submitAction() {
  if (window.getComputedStyle(form).display != "none") {
    form.style.display = "none";
    container.style.display = "flex";
  } else {
    form.style.display = "none";
    container.style.display = "flex";
  }
}

function numMatch() {
  let match = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < match.length; i++) {
    let [a, b, c] = match[i];
    if (
      spans[a].getAttribute("brand") != null &&
      spans[a].getAttribute("brand") === spans[b].getAttribute("brand") &&
      spans[a].getAttribute("brand") === spans[c].getAttribute("brand")
    ) {
      return spans[a].getAttribute("brand");
    }
  }
}
