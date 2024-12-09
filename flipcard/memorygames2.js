

const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const result2 = document.querySelector(".result-container");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;
// Reference to the dropdown
const dropdown = document.getElementById("difficulty-select");

// Variable to store the selected value
let difficulty = 4;
let tempSize = 1;
let numrows = 4;
let numcols = 4;
let score = 1000;
let numMultiflier = 1;

document.addEventListener("DOMContentLoaded", function () {
  const difficultyBtn = document.getElementById("diff-design");
  const modal = document.getElementById("difficulty-modal");
  const difficultyOptions = document.querySelectorAll(".btn-difficulty");

  difficultyBtn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  difficultyOptions.forEach(function (option) {
    option.addEventListener("click", function () {
      const textdifficulty = this.getAttribute("data-difficulty");
      difficultyBtn.textContent = textdifficulty;
      modal.style.display = "none";
      result2.style.display = "none";
      if (textdifficulty === "Easy") {
        // difficulty = 4;
        numrows= 4;
        numcols= 4;
        tempSize = 1;
        score = 1000;
        numMultiflier = 1;
      } else if (textdifficulty === "Normal") {
        difficulty = 5;
        numrows= 5;
        numcols= 4;
        tempSize = 1;
        score = 1000;
        numMultiflier = 1.1;
      } else if (textdifficulty === "Hard") {
        difficulty = 5;
        numrows= 5;
        numcols= 4;
        tempSize = 2;
        score = 1000;
        numMultiflier = 1.3;
      } else if (textdifficulty === "Extreme") {
        difficulty = 6;
        numrows= 6;
        numcols= 5;
        tempSize = 2;
        score = 1000;
        numMultiflier = 1.7;
      }

      // Remove 'active' class from all buttons
      difficultyOptions.forEach((btn) => btn.classList.remove("active"));
      // Add 'active' class to the clicked button
      this.classList.add("active");
    });
  });
});

//Items array
const items = [
  { name: "harddrive", image: "./image/harddrive.jpg" },
  { name: "arduino", image: "./image/arduino.jpg" },
  { name: "cpu", image: "./image/cpu.jpg" },
  { name: "headphones", image: "./image/headphones.jpg" },
  { name: "keyboard", image: "./image/keyboard.jpg" },
  { name: "laptop", image: "./image/laptop.jpg" },
  { name: "monitor", image: "./image/monitor.jpg" },
  { name: "mouse", image: "./image/mouse.jpg" },
  { name: "pendrive", image: "./image/pendrive.jpg" },
  { name: "ram", image: "./image/ram.jpg" },
  { name: "rom", image: "./image/rom.jpg" },
  { name: "router", image: "./image/router.jpg" },
  { name: "java", image: "./image/java.png" },
  { name: "c", image: "./image/c.png" },
  { name: "sql", image: "./image/sql.png" },
  { name: "html", image: "./image/html.png" },
  { name: "css2", image: "./image/css2.png" },
  { name: "javascript", image: "./image/javascript.png" },
  { name: "python", image: "./image/python.png" },
  { name: "ruby", image: "./image/ruby.png" },
];
const items2 = [
  { name: "firsts", image: "./image/first.png" },
  { name: "second", image: "./image/second.png" },
  { name: "third", image: "./image/third.png" },
  { name: "fourth", image: "./image/fourth.png" },
  { name: "fifth", image: "./image/fifth.png" },
  { name: "sixth", image: "./image/sixth.png" },
  { name: "seventh", image: "./image/seventh.png" },
  { name: "eighth", image: "./image/eigth.png" },
  { name: "ninth", image: "./image/ninth.png" },
  { name: "tenth", image: "./image/tenth.png" },
  { name: "eleventh", image: "./image/eleventh.png" },
  { name: "twelfth", image: "./image/twelfth.png" },
  { name: "thirteenth", image: "./image/thirteenth.png" },
  { name: "fourteenth", image: "./image/fourteenth.png" },
  { name: "fifteenth", image: "./image/fifteenth.png" },
  { name: "sixteenth", image: "./image/sixteenth.png" },
  { name: "seventeenth", image: "./image/seventeenth.png" },  
  { name: "eighteenth", image: "./image/eighteenth.png" },
];
//Initial Time
let seconds = 0,
  minutes = 0;
//Initial moves and win count
let movesCount = 0,
  winCount = 0;

let points = 0;
let addPoints = 0;
//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time: </span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
};
 
const calculatePoints = (moveCount, timeInSeconds) => {
  const BaseScore = score * numMultiflier; // Starting points
  const MovePenalty = 10; // Points deducted per move
  const TimePenalty = 1; // Points deducted per second
  // Calculate total deductions
  const moveDeductions = MovePenalty * moveCount;
  const timeDeductions = TimePenalty * timeInSeconds;

  // Calculate final score
  const finalScore = Math.max(BaseScore - moveDeductions - timeDeductions, 0);
  return finalScore;
};


const tempArrayGen = (numitems = tempSize) => {
  if (numitems === 2) {
    return [...items2];
  } else {
    return [...items];
  }
};
//Pick random objects from the items array
const generateRandom = (rows = numrows, cols = numcols) => {
  const totalCards = (rows * cols) / 2;
  //temporary array
  let tempArray = tempArrayGen();
  //initializes cardValues array
  let cardValues = [];
  //size should be double (4*4 matrix)/2 since pairs of objects would exist
  // size = (size * size) / 2;
  //Random object selection
  for (let i = 0; i < totalCards; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, rows = numrows, cols = numcols) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);

  for (let i = 0; i < rows * cols; i++) {
    /*
        Create Cards
        before => front side (contains question mark)
        after => back side (contains actual image);
        data-card-values is a custom attribute which stores the names of the cards to match later
      */
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${cols},auto)`;
  gameContainer.style.gridTemplateRows = `repeat(${rows},auto)`;

  //Cards
  cards = document.querySelectorAll(".card-container");
  resistorImg = document.querySelectorAll(".card-after .image");
  if (tempSize === 2) {
    resistorImg.forEach((img) => {
      img.style.height = "auto";
      img.style.transform = "scale(1.5) rotate(45deg)";
    });
  }

  if (difficulty == 6) {
    cards.forEach((card) => {
      card.style.height = "65px";
      card.style.width = "65px";
    });
  } else if (difficulty == 5) {
    cards.forEach((card) => {
      card.style.height = "75px";
      card.style.width = "75px";
    });
  }
  //new code
  let isClickable = true; // New variable to control clickability

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // Ignore clicks if it's not clickable or the card is already matched or flipped
      if (
        !isClickable ||
        card.classList.contains("matched") ||
        card.classList.contains("flipped")
      ) {
        return; // Exit the function if conditions are met
      }

      isClickable = false; // Disable further clicks for the moment
      card.classList.add("flipped");

      if (!firstCard) {
        // If it's the first card clicked
        firstCard = card;
        firstCardValue = card.getAttribute("data-card-value");
        isClickable = true; // Allow click for the next card
      } else {
        // Handle the second card clicked
        movesCounter();
        let finalScore = calculatePoints(movesCount, seconds)  + addPoints;
        let partialScore = calculatePoints(movesCount, 0)  + addPoints;
        scoreDisplay.innerHTML = `<span>Score:</span> ${partialScore}`;

        secondCard = card;
        let secondCardValue = card.getAttribute("data-card-value");

        if (firstCardValue === secondCardValue) {
          // If cards match
          firstCard.classList.add("matched");
          secondCard.classList.add("matched");
          winCount += 1;
          firstCard = false;

          addPoints = 3 * winCount;

          if (winCount === Math.floor(cardValues.length / 2)) {
            let finalScore2 = finalScore + addPoints;
            let finalTime = (minutes < 10 ? `0${minutes}` : minutes) + ":" + (seconds < 10 ? `0${seconds}` : seconds);
            result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>
            <h5>Time: ${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}</h5>
            <h3>Score: ${finalScore2}</h3>`;
            result2.style.display = "flex";
            window.addEventListener("click", function (event) {
              if (event.target == result2) {
                result2.style.display = "none";
              }

              this.localStorage.setItem("score", finalScore2);
              this.localStorage.setItem("moves", movesCount);
              this.localStorage.setItem("time", finalTime);

            });
            stopGame();
          }
          isClickable = true; // Allow clicks again
        } else {
          // If cards don't match, flip them back after a delay
          let [tempFirst, tempSecond] = [firstCard, secondCard];
          firstCard = false;
          secondCard = false;

          setTimeout(() => {
            tempFirst.classList.remove("flipped");
            tempSecond.classList.remove("flipped");
            isClickable = true; // Re-enable clicks after flipping back
          }, 900); // Duration for which the cards remain flipped
        }
      }
    });
  });
};

//Start game
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  //controls amd buttons visibility
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //initial moves
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});

//Stop game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  scoreDisplay.innerHTML = `<span>Score:</span> ${score * numMultiflier}`;
  winCount = 0;
  numrows;
  numcols;
  let cardValues = generateRandom(numrows, numcols);
  matrixGenerator(cardValues, numrows, numcols);
};

// scoreDisplay.innerHTML = `<span>Score:</span> ${finalScore}`;
const highscore = document.querySelector(".highscore-container");
let bclick = 1;
function viewLeaderboard() {
  if (bclick == 1) {
    highscore.style.display = "flex";
    bclick = 2;
  }else if (bclick == 2) {
    highscore.style.display = "none";
    bclick = 1;
  }
}

