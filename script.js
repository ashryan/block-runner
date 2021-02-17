const container = document.getElementById("container")
let board = []
let snakePosVal;

const createGrid = () => {
    for(let i = 0; i<784;i++){
        const grid = document.createElement('div');
        container.appendChild(grid)
        board.push(grid)
        

        if (i <= 27 || i % 28 == 0 || i > 756 && i <= 784 || i % 28 === 27) {
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

const moveSnake = (event)  => {
    // board[snakePos].classList.remove('snake')
    
    

    const down = () => {
    
        board[snakePos].classList.remove('snake')
        snakePos =  snakePos + snakePosVal
        board[snakePos].classList.add('snake')

       
        }

       
    if(event.keyCode === 40) {
        
        snakePosVal =  28;
        console.log('down')
         var snakePosInterval = setInterval(down, 300)
        return clearInterval(snakePosInterval)

    }else if(event.keyCode === 13){
        snakePosVal = 1;
        snakePostInterval = setInterval(down, 300)
            
    }else if(event.keyCode === 39) {
        clearInterval(snakePosInterval)
        snakePosVal = 1;
        
       snakePosInterval =  setInterval(down, 300)
       return clearInterval(snakePosInterval)
       

    } else if(event.keyCode === 38){
        console.log('up')
        snakePosVal= - 28
        snakePosInterval = setInterval(down, 300)
        return clearInterval(snakePosInterval)
       
    } else if(event.keyCode === 37){
        console.log('left')
        snakePosVal = -1;
        snakePosInterval = setInterval(down, 300)
        return clearInterval(snakePosInterval)
    
        
    }  
        
    
    
    board[snakePos].classList.add('snake')


     
} 
 



document.addEventListener('keyup', moveSnake)

