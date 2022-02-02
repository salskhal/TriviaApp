let userName = document.querySelector(".category--user__input");
let categeories = document.querySelectorAll(".category--category-select__grid-card");
let startBtn = document.querySelector(".category--start");
let categoryApi = ""
let categoryNum, currentPlayer;
let choices = document.querySelectorAll(".quiz--main_container--text")
let score = 0
let mainQuestion = document.querySelector(".quiz--main_question");

let categoryContainer = document.querySelector(".category");
let quizContainer = document.querySelector(".quiz");
let loader = document.querySelector(".quiz--load");
let mainQuizContainer = document.querySelector(".quiz--main");


let questionArray = []

let availableQuestion = []

let currentQuestion = {}

let acceptingAnswers = false



startBtn.addEventListener("click", quizStart)


categeories.forEach(category => {
    category.addEventListener("click", () => {
        const currentSelectedCatgeory = document.querySelector(".selected")
        if (currentSelectedCatgeory) {
            currentSelectedCatgeory.classList.remove('selected')
        }
        category.classList.toggle("selected")
        categoryApi = category.innerText
        console.log(categoryApi)
    })

})


const categoryArray = [{
        category: "General Knowledge",
        categoryNumber: 9
    },
    {
        category: "Music",
        categoryNumber: 12
    },
    {
        category: "Television",
        categoryNumber: 14
    },
    {
        category: "Science",
        categoryNumber: 19
    }
]


function quizStart() {
    currentPlayer = userName.value
    categoryArray.map(obj => {
        if (obj.category === categoryApi && currentPlayer !== "") {
            categoryNum = obj.categoryNumber
            console.log(categoryNum, obj.category)
            fetchQuiz(categoryNum)

            document.querySelector(".user-name").innerText = currentPlayer

        } else {
            document.querySelector(".error").classList.remove("hidden")
        }
    })
}



function fetchQuiz(category) {
    const API = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=medium&type=multiple`

    categoryContainer.classList.add("hidden")
    quizContainer.classList.remove("hidden")
    fetch(API)
        .then(res => res.json())
        .then(data => {
            questionArray = data.results.map(loadedQuestion => {
                const formatedQuestion = {
                    question: loadedQuestion.question
                }
                const answerChoices = [...loadedQuestion.incorrect_answers]

                formatedQuestion.answer = Math.floor(Math.random() * 4) + 1

                answerChoices.splice(
                    formatedQuestion.answer - 1,
                    0,
                    loadedQuestion.correct_answer
                )

                answerChoices.forEach((choice, index) => {
                    formatedQuestion['choice' + (index + 1)] = choice;
                });
                return formatedQuestion
            })
            startGame()
        })
        .catch(error => console.log(error))
}


function startGame() {
    console.log(questionArray)
    availableQuestion = [...questionArray]
    mainQuizContainer.classList.remove("hidden")
    loader.classList.add("hidden")
    setNextQuestion()
    console.log(currentPlayer)
}


let questionCounter = 0

const MAX_QUESTION = 10
const BONUS_POINT = 10



function setNextQuestion() {
    console.log(availableQuestion)

    if (availableQuestion.length === 0 || questionCounter >= MAX_QUESTION) {
        // console.log("you have finshed")
        let currentuser = currentPlayer
        localStorage.setItem('mostRecentScore', score);
        localStorage.setItem('username', currentuser);
        return window.location.assign('/end.html');


    } else {
        questionCounter++
        const questionIndex = Math.floor(Math.random() * availableQuestion.length)

        currentQuestion = availableQuestion[questionIndex]

        mainQuestion.innerHTML = currentQuestion.question

        document.querySelector(".question-number").innerHTML = `Question ${questionCounter} / ${MAX_QUESTION}`


        choices.forEach(choice => {
            const number = choice.dataset["number"]
            choice.innerHTML = currentQuestion["choice" + number]
        })

        availableQuestion.splice(questionIndex, 1);
        acceptingAnswers = true
    }
}



choices.forEach(choice => {
    choice.addEventListener("click", (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedOption = e.target
        const selectedAnswer = selectedOption.dataset["number"]

        console.log(selectedAnswer)


        const rightOrWrong =
            selectedAnswer == currentQuestion.answer ? "true" : "false";

        if (rightOrWrong === "true") {
            incrementScore(BONUS_POINT)
        }

        selectedOption.classList.add(rightOrWrong)

        setTimeout(() => {
            selectedOption.classList.remove(rightOrWrong)
            setNextQuestion()
        }, 1000)
    })
})


incrementScore = (num) => {
    score += num
    // document.querySelector(".score").innerHTML = score
}