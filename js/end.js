const username =  localStorage.getItem('username')

const finalscore =  localStorage.getItem('mostRecentScore')


let savebtn = document.querySelector(".save")


let setUsername = document.querySelector(".username")

let setScore = document.querySelector(".score")

const highScore = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_SCORE = 5

setUsername.innerText = username
setScore.innerText = finalscore

savebtn.addEventListener("click", (e) =>{
    e.preventDefault()

    const score = {
        score: finalscore,
        name: username
    }

    highScore.push(score);
    highScore.sort((a, b) => b.score - a.score);
    highScore.splice(5);
    
    localStorage.setItem("highScore", JSON.stringify(highScore))
    window.location.assign('/');
})