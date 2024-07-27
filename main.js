import "./style.css";

const score = {
  win: 0,
  loses: 0,
  tie: 0,
};

const moves = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

function RenderGame() {
  document.querySelectorAll(".btn").forEach((move) => {
    move.addEventListener("click", () => {
      const resultHTML = document.querySelector(".game__result");
      const scoreHTML = document.querySelector(".game__details");
      const playerMoveHTML = document.querySelector(".game__playermove");
      const dataInfo = move.getAttribute("data-move");

      const result = playGame(dataInfo);

      resultHTML.innerHTML = `${result}`;
      playerMoveHTML.innerHTML = `You: ${dataInfo} - Computer: ${getMoveName(computerMove)}`;

      scoreHTML.innerHTML = `Win: ${score.win} | Loses: ${score.loses} | Tie: ${score.tie}`;
    });
  });
}

let computerMove;

function playGame(playerMove) {
  computerMove = Math.floor(Math.random() * 3) + 1;

  const playerMoveValue = moves[playerMove.toLowerCase()];

  let result;
  if (playerMoveValue === computerMove) {
    result = "It's a tie!";
    score.tie++;
  } else if (
    (playerMoveValue === 1 && computerMove === 3) || // Rock beats Scissors
    (playerMoveValue === 2 && computerMove === 1) || // Paper beats Rock
    (playerMoveValue === 3 && computerMove === 2) // Scissors beat Paper
  ) {
    result = "You win!";
    score.win++;
  } else {
    result = "You lose!";
    score.loses++;
  }

  return result;
}

function getMoveName(moveValue) {
  return Object.keys(moves).find(key => moves[key] === moveValue);
}

RenderGame();
