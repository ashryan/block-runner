"use strict";

var container = document.getElementById("container");
var board = [];
var charPosVal;
var score = 0;
var numArr = [];
var charPos = 350; //creates array containing positions for orange squares avoiding walls

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
board[charPos].classList.add('char');

var endGameWall = function endGameWall() {
  if (board[charPos].classList.contains("wall")) {
    gameOverAnimation();
    charPos = 1;
  }
};

var moveChar = function moveChar(event) {
  var down = function down() {
    board[charPos].classList.remove('char');
    charPos = charPos + charPosVal;
    board[charPos].classList.add('char');
    eatOrange();
    endGameWall();
  };

  if (event.keyCode === 40) {
    charPosVal = 28;
    event.preventDefault();
    var charPosInterval = setInterval(down, 200);
    return clearInterval(charPosInterval);
  } else if (event.keyCode === 13) {
    charPosVal = 1;
    charPosInterval = setInterval(down, 200);
  } else if (event.keyCode === 39) {
    clearInterval(charPosInterval);
    charPosVal = 1;
    charPosInterval = setInterval(down, 200);
    return clearInterval(charPosInterval);
  } else if (event.keyCode === 38) {
    charPosVal = -28;
    charPosInterval = setInterval(down, 200);
    return clearInterval(charPosInterval);
  } else if (event.keyCode === 37) {
    charPosVal = -1;
    charPosInterval = setInterval(down, 200);
    return clearInterval(charPosInterval);
  }

  board[charPos].classList.add('char');
  return charPos;
};

var foodPos = 357;

var drawOrange = function drawOrange(event) {
  if (event.keyCode === 13) {
    board[foodPos].classList.add('orange-square');
  }
};

var dropBlue = function dropBlue() {
  // added setTimeout to prevent gameover being caused by instantly changing direction when eating orange square
  var currentPos = charPos;
  setTimeout(function () {
    board[currentPos].classList.add("blue-square");
  }, 300);
};

var gameOverAnimation = function gameOverAnimation() {
  var _loop = function _loop(_i2) {
    setTimeout(function () {
      board[_i2].classList.add("black");
    }, 5 * _i2);
  };

  for (var _i2 = 29; _i2 < board.length; _i2++) {
    _loop(_i2);
  }

  document.getElementById("final-score").innerHTML = "Game Over!\n    Your score is ".concat(score);
};

var eatOrange = function eatOrange(event) {
  if (foodPos == charPos) {
    board[foodPos].classList.remove("orange-square");
    var randomLocation = numArr[Math.floor(Math.random() * numArr.length)];
    foodPos = randomLocation;

    if (board[foodPos].classList.contains("blue-square")) {
      board[foodPos].classList.remove("blue-square");
    }

    board[foodPos].classList.add("orange-square");
    score++;
    scoreSelector.innerHTML = score;
    dropBlue();
  } else if (board[charPos].classList.contains("blue-square")) {
    gameOverAnimation();
    charPos = 1;
  }
};

document.addEventListener('keyup', eatOrange);
document.addEventListener('keyup', drawOrange);
document.addEventListener('keyup', moveChar);