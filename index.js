const gameBoard = () => {
  const cards = document.querySelectorAll(".card");
  const startBtn = document.querySelector("#start");
  const backOfCards = document.querySelectorAll(".back");
  const submitBtn = document.querySelector(".submit")
  const iconsTitle = document.querySelector(".icons-title")
   const iconWrapper = document.querySelector(".icon-wrapper");
   const scoreDisplay = document.querySelector(".score-display");
       const hint = document.querySelector(".hint");
   let run = 0
  let cardsFaceUp = true;
  let timerInterval;
  let score = 0;
  function randomCardGenerator() {
    cards.forEach((card) => {
      let randomNum = Math.floor(Math.random() * 4 + 1);
      if (randomNum === 1) {
        card.style.backgroundImage = "url(assets/helmet.png)";
        card.classList.add("helmet");
      } else if (randomNum === 2) {
        card.style.backgroundImage = "url(assets/soccer.png)";
        card.classList.add("soccer");
      } else if (randomNum === 3) {
        card.style.backgroundImage = "url(assets/basketball.png)";
        card.classList.add("basketball");
      } else if (randomNum === 4) {
        card.style.backgroundImage = "url(assets/baseball.png)";
        card.classList.add("baseball");
      }
    });
  }

  
submitBtn.addEventListener("click",() =>{
    submitBtn.style.display = "none"
    flipBtn.style.display = "flex"
    hint.style.display = ""
    checkWinner();
    const playerScore = document.querySelector(".player-score")
   iconWrapper.style.display = "none"
   playerScore.textContent = `${score}/16`
   scoreDisplay.style.display = "block"
})
  const flipBtn = document.querySelector(".flip");
  function flipCards() {
    cards.forEach((card) => {
      if (card.style.transform === "") {
        card.style.transform = "rotateY(180deg)";
        cardsFaceUp = false;
      } else if (card.style.transform == "rotateY(180deg)") {
        card.style.transform = "";
        cardsFaceUp = true;
      }
    });
  }
  flipBtn.addEventListener("click", flipCards);

  function startTimer() {
    clearInterval(timerInterval);
    const startTime = new Date().getTime(); // Get the current time in milliseconds
    const timer = document.querySelector(".timer");
    timerInterval = setInterval(() => {
      const currentTime = new Date().getTime(); // Get the current time again
      const elapsedTime = currentTime - startTime; // Calculate elapsed time in milliseconds
      const remainingSeconds = Math.ceil((11000 - elapsedTime) / 1000); // Calculate remaining seconds
      timer.textContent = remainingSeconds;
      if (remainingSeconds <= 0) {
        clearInterval(timerInterval); // Stop the timer when 10 seconds have elapsed
        flipCards();
        iconsTitle.textContent = "DRAG THESE"
        iconsTitle.style.animation = "bounce 1s ease-in-out infinite"
        submitBtn.style.display = "flex";
        hint.style.display = "block"

      }
    }, 1000); // Update the timer every second (1000 milliseconds)
  }

  startBtn.addEventListener("click", () => {
    cards.forEach(card=>{
        let classArray = card.classList
        let lastAdded = card.classList[classArray.length - 1]
        card.classList.remove(lastAdded)
    })

    backOfCards.forEach((back) => {
      back.innerHTML = "";
      back.style.backgroundColor = ""
      iconsTitle.textContent = "FOCUS"
      iconsTitle.style.animation = "";
      
    });
    score = 0
    flipBtn.style.display = ""
    submitBtn.style.display = ""
    iconWrapper.style.display = ""
    scoreDisplay.style.display = ""
    startBtn.style.top = "0";
    run++

    randomCardGenerator();
    startTimer();
    startBtn.textContent = "RESTART";
    if (startBtn.textContent === "RESTART" && !cardsFaceUp) {
      flipCards();
    } else {
      startBtn.textContent === "RESTART";
    }
  });
  function createList() {
    elements = document.querySelectorAll(".back > img");
    return elements;
  }

  function checkWinner() {
    const basketball = "url(assets/basketball.png)";
    const helmet = "url(assets/helmet.png)";
    const soccer = "url(assets/soccer.png)";
    const baseball = "url(assets/baseball.png)";
    let pieces = createList();
    pieces.forEach((piece) => {
      let grandParent = piece.parentElement.parentElement;
      if (
        (piece.className.includes("helmet") &&
          grandParent.className.includes("helmet")) ||
        (piece.className.includes("basketball") &&
          grandParent.className.includes("basketball")) ||
        (piece.className.includes("baseball") &&
          grandParent.className.includes("baseball")) ||
        (piece.className.includes("soccer") &&
          grandParent.className.includes("soccer"))
      ) {
        piece.parentElement.style.backgroundColor = "rgb(108, 255, 120)";
        score++;
      }else{
        piece.parentElement.style.backgroundColor = "rgb(255, 87, 87)";
      }
    });
  }
  randomCardGenerator();
  startTimer;
  return {
    startTimer,
    randomCardGenerator,
  };
};

gameBoard();

const startGame = () => {
  const backOfCards = document.querySelectorAll(".back");
  const icons = document.querySelectorAll(".drag-icons");
  const iconContainer1 = document.querySelector(".icon1");
  const iconContainer2 = document.querySelector(".icon2");
  const iconContainer3 = document.querySelector(".icon3");
  const iconContainer4 = document.querySelector(".icon4");
  let selected;
  let isActive = false;

  icons.forEach((icon) => {
    icon.addEventListener("dragstart", (event) => {
      icon.style.width = "70%";
      selected = event.target;

      icon.addEventListener("dblclick", () => {
        if (icon.parentElement.className.includes("back")) {
          icon.remove();
        }
      });

      if (selected.parentElement.className.includes("icon")) {
        isActive = false;
      } else if (selected.parentElement.className.includes("back")) {
        isActive = true;
      }
    });
  });
  backOfCards.forEach((back) => {
    back.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    back.addEventListener("drop", (event) => {
     if(back.innerHTML === "")  { 
      const iconCopy = document.createElement("img");
      iconCopy.src = `${selected.src}`;
      iconCopy.draggable = true;
      iconCopy.classList.add("drag-icons");

      if (!isActive) {
        if (selected.id === "1") {
          iconCopy.classList.add("helmet");
          iconCopy.id = "1";
          iconContainer1.appendChild(iconCopy);
        } else if (selected.id === "2") {
          iconCopy.classList.add("basketball");
          iconCopy.id = "2";
          iconContainer2.appendChild(iconCopy);
        } else if (selected.id === "3") {
          iconCopy.classList.add("baseball");
          iconCopy.id = "3";
          iconContainer3.appendChild(iconCopy);
        } else if (selected.id === "4") {
          iconCopy.classList.add("soccer");
          iconCopy.id = "4";
          iconContainer4.appendChild(iconCopy);
        }
      }
      iconCopy.addEventListener("dragstart", (event) => {
        iconCopy.style.width = "70%";
        selected = event.target;
        if (selected.parentElement.className.includes("icon")) {
          isActive = false;
        } else if (selected.parentElement.className.includes("back")) {
          isActive = true;
        }
      });

      iconCopy.addEventListener("dblclick", (event)=>{
        if(iconCopy.parentElement.className.includes("back")){
            iconCopy.remove()
        }
      })
      back.appendChild(selected);
      selected = null;
    }
    });

  });
};

startGame();
