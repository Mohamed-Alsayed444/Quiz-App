import  Question  from "./question.js"
import {Quiz} from "./quiz.js"

// console.log("hi");
// let quiz = new Quiz(28 , "easy" , 10)
// quiz.getQuestion()



const categoryMenu= document.getElementById("categoryMenu")
const difficultyOptions= document.getElementById("difficultyOptions")
const questionsNumber= document.getElementById("questionsNumber")
const startQuiz= document.getElementById("startQuiz")
const quizOptions= document.getElementById("quizOptions")
export const Display= document.querySelector(".questions-container")
export let questions
export let quiz 

startQuiz.addEventListener("click", async function(){
    let category = categoryMenu.value
    let difficulty = difficultyOptions.value
    let number = questionsNumber.value

     quiz = new Quiz(category, difficulty, number)
    // console.log(quiz.score);
    questions = await quiz.getQuestion()
    const question = new Question(0)
    

    quizOptions.classList.replace("d-flex" , "d-none")

    question.displayQuestion()
})