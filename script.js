const container = document.getElementById("container")
let board = []
var charPosVal;
let score = 0;
let numArr = []
let charPos = 350;


//creates array containing positions for orange squares avoiding walls
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

board[charPos].classList.add('char')

const endGameWall = () => {
    if (board[charPos].classList.contains("wall")){
        gameOverAnimation()
        charPos = 1

    }
}

const moveChar = (event)  => {
    
      
    const down = () => {
    
        board[charPos].classList.remove('char')
        charPos =  charPos + charPosVal
        board[charPos].classList.add('char')
        eatOrange()
        endGameWall()
    }

       
    if(event.keyCode === 40) {
        
        charPosVal =  28;
        event.preventDefault();
         var charPosInterval = setInterval(down, 200)


         
        return clearInterval(charPosInterval)

    }else if(event.keyCode === 13){
        charPosVal = 1;
        charPosInterval = setInterval(down, 200)
        
            
    }else if(event.keyCode === 39) {
        clearInterval(charPosInterval)
        charPosVal = 1;
        
       charPosInterval =  setInterval(down, 200)
       return clearInterval(charPosInterval)
       

    } else if(event.keyCode === 38){
      
        charPosVal= - 28
        charPosInterval = setInterval(down, 200)
        return clearInterval(charPosInterval)
       
    } else if(event.keyCode === 37){
       
        charPosVal = -1;
        charPosInterval = setInterval(down, 200)
        return clearInterval(charPosInterval)
   }  
    
    
    board[charPos].classList.add('char')
    
    return charPos;
} 
 

let foodPos = 357;

const drawOrange = (event) => {
   

    if(event.keyCode === 13) {
    board[foodPos].classList.add('orange-square')
    
    }
} 

const dropBlue = () => {
    // added setTimeout to prevent gameover being caused by instantly changing direction when eating orange square
    const currentPos = charPos
    setTimeout(function() {
    board[currentPos].classList.add("blue-square") 
    },300  )

}



const gameOverAnimation = () => {

    for(let i = 29; i < board.length; i++){
        setTimeout(function() {
            board[i].classList.add("black")
             
        }, 5 * i)
    }
  
    document.getElementById("final-score").innerHTML = `Game Over!
    Your score is ${score}`

} 



const eatOrange = (event) => {

    if( foodPos == charPos) {
       
        
        board[foodPos].classList.remove("orange-square")
    
        let randomLocation = numArr[Math.floor(Math.random() * numArr.length)]

        foodPos = randomLocation;

        if(board[foodPos].classList.contains("blue-square")) {
            board[foodPos].classList.remove("blue-square")
        }
    
        board[foodPos].classList.add("orange-square")

       score++
       scoreSelector.innerHTML = score;

        dropBlue()
       
        
    }  else if(board[charPos].classList.contains("blue-square")) {

        gameOverAnimation()
        charPos = 1;
        
    }
}   

    



document.addEventListener('keyup', eatOrange)
document.addEventListener('keyup', drawOrange)
document.addEventListener('keyup', moveChar)

