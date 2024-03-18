const roomImages = {
  kitchen: "images/kitchen.jpg",
  livingroom: "images/living-room.jpg",
  bedroom: "images/bedroom.jpg",
  garage: "images/garage.jpg",
};

const roomButtons = document.querySelectorAll(".sidebar li");
const roomImageElement = document.getElementById("room-image");
const cheekuElement = document.getElementById("cheeku");
const timerText = document.getElementById("timer-text");
const scoreText = document.getElementById("score-text");
const gameOverMessage = document.createElement("div");

let currentRoom = "kitchen";
let score = 0;
let timer;

function changeRoom(room) {
  roomImageElement.style.backgroundImage = `url(${roomImages[room]})`;
  placeCheeku();
  resetTimer();
  resetScore();
}

function placeCheeku() {
  const roomBounds = roomImageElement.getBoundingClientRect();
  const maxX = roomBounds.width - cheekuElement.clientWidth; // Maximum valid X position
  const maxY = roomBounds.height - cheekuElement.clientHeight; // Maximum valid Y position
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  cheekuElement.style.left = `${randomX}px`;
  cheekuElement.style.top = `${randomY}px`;
}

function startTimer() {
  timer = setInterval(() => {
    let timeLeft = parseInt(timerText.textContent);
    timeLeft--;
    timerText.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      gameOver();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timerText.textContent = 30;
  startTimer();
}

function resetScore() {
  score = 0;
  scoreText.textContent = score;
}

function gameOver() {
  gameOverMessage.textContent = "Time's Up! You scored " + score + " points.";
  gameOverMessage.classList.add("game-over");
  document.body.appendChild(gameOverMessage);
}

function handleClick(event) {
  if (event.target === cheekuElement) {
    score += 10;
    scoreText.textContent = score;
    placeCheeku();
    resetTimer();
  }
}

roomButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentRoom = button.id.slice(0, -4); // Extract room name from button ID
    changeRoom(currentRoom);
  });
});

cheekuElement.addEventListener("click", handleClick);

changeRoom(currentRoom);