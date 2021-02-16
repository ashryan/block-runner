"use strict";

var container = document.getElementById("container");
var board = [];

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
  board[snakePos].classList.remove('snake');

  if (event.keyCode === 40) {
    console.log('down');
    var down = setInterval(function () {
      board[snakePos].classList.remove('snake');
      snakePos += 28;
      board[snakePos].classList.add('snake');
    }, 300);
  } else if (event.keyCode === 39) {
    clearInterval();
    var right = setInterval(function () {
      board[snakePos].classList.remove('snake');
      snakePos += 1;
      board[snakePos].classList.add('snake');
    }, 300);
  } else if (event.keyCode === 38) {
    console.log('up');
    snakePos -= 28;
  } else if (event.keyCode === 37) {
    console.log('left');
    snakePos -= 1;
  }

  board[snakePos].classList.add('snake');
};

document.addEventListener('keyup', moveSnake);