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
let difficulty2;
let difficulty = 4;
let tempSize = 1;
// Event listener to update the `difficulty` variable
// dropdown.addEventListener("change", () => {
//   difficulty2 = dropdown.value;
//   if (difficulty2 === "extreme") {
//     difficulty = 4;
//     tempSize = 2;
//   } else if (difficulty2 === "easy") {
//     difficulty = 2;
//     tempSize = 1;
//   } else if (difficulty2 === "normal") {
//     difficulty = 4;
//     tempSize = 1;
//   } else if (difficulty2 === "hard") {
//     difficulty = 6;
//     tempSize = 1;
//   }
//   initializer();
// });

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
      result.style.display = "none";
      console.log(textdifficulty);
      if (textdifficulty === "Easy") {
        difficulty = 4;
        tempSize = 1;
        console.log(difficulty + "2");
      } else if (textdifficulty === "Normal") {
        difficulty = 6;
        tempSize = 1;
        console.log(difficulty + "1");
      } else if (textdifficulty === "Hard") {
        difficulty = 4;
        tempSize = 2;
        console.log(difficulty + "1");
      } else if (textdifficulty === "Extreme") {
        difficulty = 6;
        tempSize = 2;
        console.log(difficulty + "1");
      }

      // Remove 'active' class from all buttons
      difficultyOptions.forEach((btn) => btn.classList.remove("active"));
      // Add 'active' class to the clicked button
      this.classList.add("active");
    });
  });

  // You can add more functionality for the start game and back to home buttons here
  // document.getElementById('start').addEventListener('click', function() {
  //     console.log('Start game clicked');

  // });

  // document.getElementById('home_btn').addEventListener('click', function() {
  //     console.log('Back to home clicked');

  // });
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
  { name: "java", image: "image/java.png" },
  { name: "c", image: "image/c.png" },
  { name: "sql", image: "image/sql.png" },
  { name: "html", image: "image/html.png" },
  { name: "css2", image: "image/css2.png" },
  { name: "javascript", image: "image/javascript.png" },
  { name: "python", image: "image/python.png" },
  { name: "ruby", image: "image/ruby.png" },
];
const items2 = [
  { name: "firsts", image: "image/first.png" },
  { name: "second", image: "image/second.png" },
  { name: "third", image: "image/third.png" },
  { name: "fourth", image: "image/fourth.png" },
  { name: "fifth", image: "image/fifth.png" },
  { name: "sixth", image: "image/sixth.png" },
  { name: "seventh", image: "image/seventh.png" },
  { name: "eighth", image: "image/eigth.png" },
  { name: "ninth", image: "image/ninth.png" },
  { name: "tenth", image: "image/tenth.png" },
  { name: "eleventh", image: "image/eleventh.png" },
  { name: "twelfth", image: "image/twelfth.png" },
  { name: "thirteenth", image: "image/thirteenth.png" },
  { name: "fourteenth", image: "image/fourteenth.png" },
  { name: "fifteenth", image: "image/fifteenth.png" },
  { name: "sixteenth", image: "image/sixteenth.png" },
  { name: "seventeenth", image: "image/seventeenth.png" },
  { name: "eighteenth", image: "image/eighteenth.png" },
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

const tempArrayGen = (numitems = tempSize) => {
  if (numitems === 2) {
    console.log("items 2");
    return [...items2];
  } else {
    console.log("items 1");
    return [...items];
  }
};
//Pick random objects from the items array
const generateRandom = (size = 4) => {
  //temporary array
  // let tempArray;
  let tempArray = tempArrayGen();
  // console.log(tempArray+ "THIS IS THE WOWOWOW");
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
  resistorImg = document.querySelectorAll(".card-after .image");
  if (tempSize === 2) {
    resistorImg.forEach((img) => {
      img.style.height = "auto";
      img.style.transform = "scale(1.5) rotate(45deg)";
    });
  }

  if (difficulty == 6) {
    cards.forEach((card) => {
      card.style.height = "45px";
      card.style.width = "45px";
      console.log(card);
    });
  } else if (difficulty == 4) {
    cards.forEach((card) => {
      card.style.height = "70px";
      card.style.width = "70px";
      console.log(card);
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
