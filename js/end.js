const username =  localStorage.getItem('username')

const score =  localStorage.getItem('mostRecentScore')


let setUsername = document.querySelector(".username")

let setScore = document.querySelector(".score")


setUsername.innerText = username
setScore.innerText = score
