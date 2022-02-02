const highscoreList = document.querySelector(".score")

const highScores = JSON.parse(localStorage.getItem("highScore")) || []


highscoreList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join("")