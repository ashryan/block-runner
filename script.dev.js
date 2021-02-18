"use strict";

var container = document.getElementById("container");
var board = [];
var snakePosVal;
var score = 0;
var numArr = [];

for (var i = 1; i < 784; i++) {
  if (i % 28 === 0 || i % 28 === 27 || i <= 27 || i > 756 && i <= 784) {
    continue;
  }

  numArr.push(i);
}

console.log(numArr);
var scoreSelector = document.querySelector("#score");

var createGrid = function createGrid() {
  for (var _i = 0; _i < 784; _i++) {
    var grid = document.createElement('div');
    container.appendChild(grid);
    board.push(grid);

    if (_i <= 27 || _i % 28 === 0 || _i > 756 && _i <= 784 || _i % 28 === 27) {
      board[_i].classList.add('wall');
    } else {
      board[_i].classList.add('bg');
    }
  }
};

createGrid();
console.log(board);
var snakePos = 350;
board[snakePos].classList.add('snake');

var endGameWall = function endGameWall() {
  if (board[snakePos].classList.contains("wall")) {
    alert("game over");
  }
};

var moveSnake = function moveSnake(event) {
  // board[snakePos].classList.remove('snake')
  var down = function down() {
    board[snakePos].classList.remove('snake');
    snakePos = snakePos + snakePosVal;
    board[snakePos].classList.add('snake');
    eatFood();
    endGameWall();
  };

  if (event.keyCode === 40) {
    snakePosVal = 28;
    console.log('down');
    event.preventDe;
    var snakePosInterval = setInterval(down, 200);
    return clearInterval(snakePosInterval);
  } else if (event.keyCode === 13) {
    snakePosVal = 1;
    snakePosInterval = setInterval(down, 200);
  } else if (event.keyCode === 39) {
    clearInterval(snakePosInterval);
    snakePosVal = 1;
    snakePosInterval = setInterval(down, 200);
    return clearInterval(snakePosInterval);
  } else if (event.keyCode === 38) {
    console.log('up');
    snakePosVal = -28;
    snakePosInterval = setInterval(down, 200);
    return clearInterval(snakePosInterval);
  } else if (event.keyCode === 37) {
    console.log('left');
    snakePosVal = -1;
    snakePosInterval = setInterval(down, 200);
    return clearInterval(snakePosInterval);
  }

  board[snakePos].classList.add('snake');
  return snakePos;
};

var foodPos = 357;

var drawFood = function drawFood(event) {
  if (event.keyCode === 13) {
    board[foodPos].classList.add('food');
  }
};

var dropBomb = function dropBomb() {
  board[snakePos].classList.add("tail");
};

var eatFood = function eatFood(event) {
  if (foodPos == snakePos) {
    // event.keyCode === 32 &&
    board[foodPos].classList.remove("food");
    var randomLocation = numArr[Math.floor(Math.random() * numArr.length)];
    foodPos = randomLocation;

    if (board[foodPos].classList.contains("tail")) {
      board[foodPos].classList.remove("tail");
    }

    board[foodPos].classList.add("food");
    score++;
    scoreSelector.innerHTML = score;
    dropBomb();
  } else if (board[snakePos].classList.contains("tail")) {
    //event.keyCode === 32  &&  
    alert("game over");
  }
};

document.addEventListener('keyup', eatFood);
document.addEventListener('keyup', drawFood);
document.addEventListener('keyup', moveSnake);