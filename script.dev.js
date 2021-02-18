"use strict";

var container = document.getElementById("container");
var board = [];
var snakePosVal;
var score = 0;
var scoreSelector = document.querySelector("#score");

var createGrid = function createGrid() {
  for (var i = 0; i < 784; i++) {
    var grid = document.createElement('div');
    container.appendChild(grid);
    board.push(grid);

    if (i <= 27 || i % 28 == 0 || i > 756 && i <= 784 || i % 28 === 27) {
      board[i].classList.add('wall');
    } else {
      board[i].classList.add('bg');
    }
  }
};

createGrid();
console.log(board);
var snakePos = 350;
board[snakePos].classList.add('snake');

var moveSnake = function moveSnake(event) {
  // board[snakePos].classList.remove('snake')
  var down = function down() {
    board[snakePos].classList.remove('snake');
    snakePos = snakePos + snakePosVal;
    board[snakePos].classList.add('snake');
  };

  if (event.keyCode === 40) {
    snakePosVal = 28;
    console.log('down');
    var snakePosInterval = setInterval(down, 300);
    return clearInterval(snakePosInterval);
  } else if (event.keyCode === 13) {
    snakePosVal = 1;
    snakePosInterval = setInterval(down, 300);
  } else if (event.keyCode === 39) {
    clearInterval(snakePosInterval);
    snakePosVal = 1;
    snakePosInterval = setInterval(down, 300);
    return clearInterval(snakePosInterval);
  } else if (event.keyCode === 38) {
    console.log('up');
    snakePosVal = -28;
    snakePosInterval = setInterval(down, 300);
    return clearInterval(snakePosInterval);
  } else if (event.keyCode === 37) {
    console.log('left');
    snakePosVal = -1;
    snakePosInterval = setInterval(down, 300);
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

var eatFood = function eatFood(event) {
  if (event.keyCode === 32 && foodPos == snakePos) {
    board[foodPos].classList.remove("food");
    foodPos = Math.floor(Math.random() * 700);
    board[foodPos].classList.add("food");
    score++;
    scoreSelector.innerHTML = score;
  }
};

document.addEventListener('keyup', eatFood);
document.addEventListener('keyup', drawFood);
document.addEventListener('keyup', moveSnake);