import { questions ,quiz ,Display } from "./index.js"
const tryAgain = document.getElementById("tryBtn"); 

export default class Question{
    constructor(index){
        this.question = questions[index].question
        this.answer = questions[index].correct_answer
        this.category = questions[index].category
        this.index = index
        this.wrongAnswer = questions[index].incorrect_answers
        this.answered = false
        this.allAnswer = this.getAnswerReady()
    }
    getAnswerReady(){
        return this.wrongAnswer.concat(this.answer).sort()
    }

    displayQuestion() {
        
        const questionMarkUp = `
        <div
          class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
        >
          <div class="w-100 d-flex justify-content-between">
            <span class="btn btn-category">${this.category}</span>
            <span class="fs-6 btn btn-questions">${this.index + 1} of ${questions.length
          } Questions</span>
          </div>
          <h2 class="text-capitalize h4 text-center">${this.question}</h2>  
          <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
          ${this.allAnswer.map((choice) => `<li>${choice}</li>`).join("")}
          </ul>
          <h2 class="text-capitalize text-center score-color h3 fw-bold"><i class="bi bi-emoji-laughing"></i> Score: ${quiz.score} </h2>        
        </div>
      `;
    
      Display.innerHTML = questionMarkUp;
      let answerStyle = document.querySelectorAll(".question ul li")

      for (let i = 0; i < answerStyle.length; i++) {
        answerStyle[i].addEventListener("click", (e) =>{
            this.checkAnswer(e)
        })
        
      }
    }
    checkAnswer(e){
        if(!this.answered){
            if(e.target.innerHTML.toLowerCase() == this.answer.toLowerCase()){
                e.target.classList.add(
                    "correct",
                    "animate__animated",
                    "animate__flipInY"
                  );
                  quiz.score += 1;
                } else {
                  e.target.classList.add("wrong", "animate__animated", "animate__shakeX");
                }
                this.animateQuestion(e.target , 1000)
        }
            
    }

    animateQuestion(element , duration){
        setTimeout(() =>{
            element.closest(".question").classList.replace("animate__bounceIn", "animate__bounceOutLeft")
            setTimeout(() =>{
                this.newQuestion()
            } , duration)
        },duration)

    }

    newQuestion(){
        this.index += 1
        if (this.index > questions.length -1) {
            // console.log("hi");
            Display.innerHTML=quiz.endQuiz();
              
            console.log(Display);    
            
            return;
        }

        let nextQuestion = new Question(this.index)
        nextQuestion.displayQuestion()
    }
}
