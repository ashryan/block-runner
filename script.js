const container = document.getElementById("container")
let board = []
var snakePosVal;
let score = 0;
let numArr = []
 
for(let i = 1; i < 784; i++) {
    if (i % 28 === 0 || i % 28 === 27 || i <= 27 || i >756 && i <= 784) {continue;}
    numArr.push(i)
}


console.log(numArr)

let scoreSelector = document.querySelector("#score")


const createGrid = () => {
    for(let i = 0; i<784;i++){
        const grid = document.createElement('div');
        container.appendChild(grid)
        board.push(grid)

       
         

        if (i <= 27 || i % 28 === 0 || i > 756 && i <= 784 || i % 28 === 27) {
            board[i].classList.add('wall')
           
        } else {
            board[i].classList.add('bg')
    
        } 
    } 
}
createGrid()

console.log(board)

let snakePos = 350;



board[snakePos].classList.add('snake')




const endGameWall = () => {
    if (board[snakePos].classList.contains("wall")){
        alert("game over")
    }
}

const moveSnake = (event)  => {
    // board[snakePos].classList.remove('snake')
      
    const down = () => {
    
        board[snakePos].classList.remove('snake')
        snakePos =  snakePos + snakePosVal
        board[snakePos].classList.add('snake')
        eatFood()
        endGameWall()
    }

       
    if(event.keyCode === 40) {
        
        snakePosVal =  28;
        console.log('down')
         var snakePosInterval = setInterval(down, 200)


         
        return clearInterval(snakePosInterval)

    }else if(event.keyCode === 13){
        snakePosVal = 1;
        snakePosInterval = setInterval(down, 200)
        
            
    }else if(event.keyCode === 39) {
        clearInterval(snakePosInterval)
        snakePosVal = 1;
        
       snakePosInterval =  setInterval(down, 200)
       return clearInterval(snakePosInterval)
       

    } else if(event.keyCode === 38){
        console.log('up')
        snakePosVal= - 28
        snakePosInterval = setInterval(down, 200)
        return clearInterval(snakePosInterval)
       
    } else if(event.keyCode === 37){
        console.log('left')
        snakePosVal = -1;
        snakePosInterval = setInterval(down, 200)
        return clearInterval(snakePosInterval)
   }  
    
    
    board[snakePos].classList.add('snake')
    
    return snakePos;
} 
 

let foodPos = 357;

const drawFood = (event) => {
   

    if(event.keyCode === 13) {
    board[foodPos].classList.add('food')
    }
} 

const dropBomb = () => {
  board[snakePos].classList.add("tail") 

}



const eatFood = (event) => {

    if( foodPos == snakePos) {
        // event.keyCode === 32 &&
        
        board[foodPos].classList.remove("food")
    
        let randomLocation = numArr[Math.floor(Math.random() * numArr.length)]

        foodPos = randomLocation;

        if(board[foodPos].classList.contains("tail")) {
            board[foodPos].classList.remove("tail")
        }
    
        board[foodPos].classList.add("food")

       score++
       scoreSelector.innerHTML = score;

        dropBomb()
       
        
    }  else if(board[snakePos].classList.contains("tail")) {
        //event.keyCode === 32  &&  
        alert("game over")
    }
}   

    



document.addEventListener('keyup', eatFood)
document.addEventListener('keyup', drawFood)
document.addEventListener('keyup', moveSnake)

