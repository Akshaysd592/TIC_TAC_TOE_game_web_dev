const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

// declaring some values where it meet then the player wins
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// creating a function for initializing the value in game
function initGame() {
  currentPlayer = "X";
  // to keep access of game who win
  gameGrid = ["", "", "", "", "", "", "", "", ""];

  // making UI empty after playing game
  boxes.forEach((box, index) => {
    box.innerText = "";
    // In earlier game we make restriction or disabled pointer events so again abling it
    boxes[index].style.pointerEvents = "all";
    //  adding initial properties like to remove green color obtainer in last game 
    box.classList = `box box${index + 1}`;
  });

  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player -> ${currentPlayer}`;
}

initGame();

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "0";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player -> ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";
          winningPositions.forEach((position) => {
            // all boxes obtained in non empty and having similar value
            if (
             ( gameGrid[position[0]] !== "" &&
              gameGrid[position[1]] !== "" &&
              gameGrid[position[2]] !== "") &&
             ( gameGrid[position[0]] === gameGrid[position[1]]) &&
             ( gameGrid[position[1]] === gameGrid[position[2]])) 
             {
            // check who is winner 
           if(gameGrid[position[0]]==="X")
            answer = "X";
           else
            answer = "0";

          // disabling pointer event so that other input is not entered after win
             boxes.forEach((box)=>{
                box.style.pointerEvents = " none";
             })

          // now we got the winner adding green colour
          boxes[position[0]].classList.add("win");
          boxes[position[1]].classList.add("win");
          boxes[position[2]].classList.add("win");
           }
          });


        //   winner obtained so showing on UI
          if(answer!==""){
             gameInfo.innerText= `Winner Player  : ${answer}`;
             newGameBtn.classList.add("active");
             return;
          } 
    
        //   check whether boxes are fullfilled no winner obtained or tie 
        let fillCount =0;
        gameGrid.forEach((box)=>{
            // check if there is value in gameGrid for each index 
            if(box!==""){
               fillCount++;
            }
        });


        if(fillCount===9){
            gameInfo.innerText = `Game Tied !`;
            newGameBtn.classList.add("active");
        }


}

function handleClick(index){
    if(gameGrid[index]===""){
        // showing on UI
        boxes[index].innerText = currentPlayer;
        // putting value in gameGrid to check win or not by comparing gameGrid with winningPositions
        gameGrid[index]= currentPlayer;

        //swaping turn X or 0
        swapTurn();
        // check anyone win 
        checkGameOver();
    }
}


boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
        })
});


newGameBtn.addEventListener("click",initGame);






