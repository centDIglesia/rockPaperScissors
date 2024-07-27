import "./style.css";

let score = {
  win: 0,
  loses: 0,
  tie: 0,
};

let computerMove;
const moves = ["rock", "paper", "scissors"];

function playWithKeyDown() {
  document.body.addEventListener("keydown", (event) => {
    if (event.key === "r") {
      renderGameUi("rock");
    } else if (event.key === "p") {
      renderGameUi("paper");
    } else if (event.key === "s") {
      renderGameUi("scissors");
    }
  });
}

function getPlayerMove() {
  document.querySelectorAll(".btn").forEach((move) => {
    move.addEventListener("click", () => {
      const dataInfo = move.getAttribute("data-move");
      renderGameUi(dataInfo);
    });
  });
}

function getGameResult(playerMove) {
  computerMove = moves[Math.floor(Math.random() * moves.length)];

  const playerMoveValue = playerMove;

  let result;
  if (playerMoveValue === computerMove) {
    result = "It's a tie!";
    score.tie++;
  } else if (
    (playerMoveValue === "rock" && computerMove === "scissors") || // Rock beats Scissors
    (playerMoveValue === "paper" && computerMove === "rock") || // Paper beats Rock
    (playerMoveValue === "scissors" && computerMove === "paper") // Scissors beat Paper
  ) {
    result = "You win!";
    score.win++;
  } else {
    result = "You lose!";
    score.loses++;
  }

  return result;
}




function renderGameUi(playerMove) {
  const resultHTML = document.querySelector(".game__result");
  const scoreHTML = document.querySelector(".game__details");
  const playerMoveHTML = document.querySelector(".game__playermove");

  const result = getGameResult(playerMove);

  resultHTML.innerHTML = `${result}`;
  playerMoveHTML.innerHTML = `You: ${playerMove} - Computer: ${computerMove}`;

  scoreHTML.innerHTML = `Win: ${score.win} | Loses: ${score.loses} | Tie: ${score.tie}`;
}




function resetScore() {
  const resetBtn = document.querySelector(".game__reset-btn");

  resetBtn.addEventListener("click", () => {
    // Reset the score values
    score.win = 0;
    score.loses = 0;
    score.tie = 0;

    const scoreHTML = document.querySelector(".game__details");
    scoreHTML.innerHTML = `Win: ${score.win} | Loses: ${score.loses} | Tie: ${score.tie}`;

    document.querySelector(".game__result").innerHTML = "Choose move";
    document.querySelector(".game__playermove").innerHTML = "--";
  });
}

let intervalId;
let isAutoPlaying = false;

function autoPlay() {
  const autoPlayBtn = document.querySelector(".game__auto-btn");
  document.querySelector(".game__auto-btn").addEventListener("click", () => {
    if (!isAutoPlaying) {
      intervalId = setInterval(() => {
        const playerMove = moves[Math.floor(Math.random() * moves.length)];
        renderGameUi(playerMove);
      }, 1000);

      isAutoPlaying = true;
      autoPlayBtn.innerText = "Stop Auto Play";
    } else {
      clearInterval(intervalId);
      isAutoPlaying = false;

      autoPlayBtn.innerText = "Auto Play";
    }


  });
}



playWithKeyDown();
resetScore();
getPlayerMove();
autoPlay();
