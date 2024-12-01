const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

// Reference to the dropdown
const dropdown = document.getElementById("difficulty-select");

// Variable to store the selected value
let difficulty = 4;

// Event listener to update the `difficulty` variable
dropdown.addEventListener("change", () => {
    difficulty = dropdown.value;
    console.log(`Selected difficulty: ${difficulty}`);
});


//Items array
const items = [
  { name: "harddrive", image: "image/harddrive.jpg" },
  { name: "arduino", image: "image/arduino.jpg" },
  { name: "cpu", image: "image/cpu.jpg" },
  { name: "headphones", image: "image/headphones.jpg" },
  { name: "keyboard", image: "image/keyboard.jpg" },
  { name: "laptop", image: "image/laptop.jpg" },
  { name: "monitor", image: "image/monitor.jpg" },
  { name: "mouse", image: "image/mouse.jpg" },
  { name: "pendrive", image: "image/pendrive.jpg" },
  { name: "ram", image: "image/ram.jpg" },
  { name: "rom", image: "image/rom.jpg" },
  { name: "router", image: "image/router.jpg" },
  { name: "add", image: "image/icon-add.png" },
  { name: "back", image: "image/icon-back.png" },
  { name: "edit", image: "image/icon-edit2.png" },
  { name: "exit", image: "image/icon-exit.png" },
  { name: "multiply", image: "image/icon-multichoice.png" },
  { name: "upload", image: "image/icon-upload.png" },
];

//Initial Time
let seconds = 0,
  minutes = 0;
//Initial moves and win count
let movesCount = 0,
  winCount = 0;

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

//Pick random objects from the items array
const generateRandom = (size = 4) => {
  //temporary array
  let tempArray = [...items];
  //initializes cardValues array
  let cardValues = [];
  //size should be double (4*4 matrix)/2 since pairs of objects would exist
  size = (size * size) / 2;
  //Random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;	
};

const matrixGenerator = (cardValues, size) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
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
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  //Cards
  cards = document.querySelectorAll(".card-container");

  if (difficulty == 6) {
    cards.forEach((card) => {
      card.style.height = "50px";
      card.style.width = "50px";
      console.log(card);
    });
  };
//new code
let isClickable = true; // New variable to control clickability 

cards.forEach((card) => {
  card.addEventListener("click", () => {
    // Ignore clicks if it's not clickable or the card is already matched or flipped
    if (!isClickable || card.classList.contains("matched") || card.classList.contains("flipped")) {
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
      secondCard = card;
      let secondCardValue = card.getAttribute("data-card-value");

      if (firstCardValue === secondCardValue) {
        // If cards match
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        winCount += 1;
        firstCard = false;

        if (winCount === Math.floor(cardValues.length / 2)) {
          result.innerHTML = `<h2>You Won</h2><h4>Moves: ${movesCount}</h4>`;
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
  winCount = 0;
  let cardValues = generateRandom(difficulty);
  console.log(cardValues);
  matrixGenerator(cardValues, difficulty);

  
};