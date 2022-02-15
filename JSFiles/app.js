const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const homeBox = document.querySelector(".main-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const nextLastEvent = document.querySelector(".next-last-event");
const responseBox = document.querySelector(".response-page");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;
let sampleArray = [];
let id;
let choosen;

function setAvailableQuestions() {
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestions.push(quiz[i]);
  }
}

function getNewQuestion() {
  questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;
  const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  currentQuestion = questionIndex;
  //this is where we push question to page
  questionText.innerHTML = currentQuestion.q;
  const index1 = availableQuestions.indexOf(questionIndex);
  availableQuestions.splice(index1, 1);
  const optionLen = currentQuestion.options.length;
  for (let i = 0; i < optionLen; i++) {
    availableOptions.push(i)
  }
  optionContainer.innerHTML = '';
  let animationDelay = 0.1;
  for (let i = 0; i < optionLen; i++) {
    const optonIndex = availableOptions[i];
    const index2 = availableOptions.indexOf(optonIndex);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optonIndex];
    option.id = optonIndex;
    option.style.animationDelay = animationDelay + 's';
    animationDelay = animationDelay + 0.1;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  }
  questionCounter++;
}

function getResult(element) {
  id = null;
  id = parseInt(element.id);
  if (id != currentQuestion.answer || id === currentQuestion.answer) {
    if (id === 0) {
      element.classList.add("correct");
      optionContainer.children[0].classList.remove("wrong");
      optionContainer.children[1].classList.add("wrong");
      optionContainer.children[2].classList.add("wrong");
      optionContainer.children[3].classList.add("wrong");
      optionContainer.children[1].classList.remove("correct");
      optionContainer.children[2].classList.remove("correct");
      optionContainer.children[3].classList.remove("correct");
    } else if (id === 1) {
      element.classList.add("correct");
      optionContainer.children[1].classList.remove("wrong");
      optionContainer.children[0].classList.add("wrong");
      optionContainer.children[2].classList.add("wrong");
      optionContainer.children[3].classList.add("wrong");
      optionContainer.children[0].classList.remove("correct");
      optionContainer.children[2].classList.remove("correct");
      optionContainer.children[3].classList.remove("correct");
    } else if (id === 2) {
      element.classList.add("correct");
      optionContainer.children[2].classList.remove("wrong");
      optionContainer.children[0].classList.add("wrong");
      optionContainer.children[1].classList.add("wrong");
      optionContainer.children[3].classList.add("wrong");
      optionContainer.children[0].classList.remove("correct");
      optionContainer.children[1].classList.remove("correct");
      optionContainer.children[3].classList.remove("correct");
    } else if (id === 3) {
      element.classList.add("correct");
      optionContainer.children[3].classList.remove("wrong");
      optionContainer.children[0].classList.add("wrong");
      optionContainer.children[1].classList.add("wrong");
      optionContainer.children[2].classList.add("wrong");
      optionContainer.children[0].classList.remove("correct");
      optionContainer.children[1].classList.remove("correct");
      optionContainer.children[2].classList.remove("correct");
    }
  }
}

function next() {

  const anst = currentQuestion.options[currentQuestion.answer];
  if (id == null) {
    choosen = currentQuestion.options[id];
    sampleArray.push({
      ques: currentQuestion.q,
      ans: anst,
      choosed: "Not Attempted"
    });
  } else {
    choosen = currentQuestion.options[id];
    sampleArray.push({
      ques: currentQuestion.q,
      ans: anst,
      choosed: choosen
    });
  }
  if (id === currentQuestion.answer) {
    correctAnswers++;
  } else {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
      if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
        optionContainer.children[i].classList.add("correct");
      }
    }
  }

  if (id != null) {
    attempt++;
  }
  if (questionCounter === quiz.length) {
    quizOver();
  } else {
    getNewQuestion();
    id = null;
  }
}

function quizOver() {
  quizBox.classList.add("hide");

  resultBox.classList.remove("hide");
  quizResult();
}

function quizResult() {
  resultBox.querySelector(".total-question").innerHTML = quiz.length;
  resultBox.querySelector(".total-attempt").innerHTML = attempt;
  resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
  resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
  resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function tryAgainQuiz() {
  resultBox.classList.add("hide");
  quizBox.classList.remove("hide");
  resetQuiz();
  startQuiz();
}

function resetQuiz() {
  questionCounter = 0;
  correctAnswers = 0;
  attempt = 0;
  sampleArray = [];
}

function startQuiz() {
  homeBox.classList.add("hide");
  quizBox.classList.remove("hide");
  setAvailableQuestions();
  getNewQuestion();
}

function goToHome() {
  resultBox.classList.add("hide");
  window.location.href = 'index.html';
}

function responsePage() {
  resultBox.classList.add("hide");
  responseBox.classList.remove("hide");
  responseTable();
}

function responseTable() {
  allRespsonse(sampleArray);
}

function allRespsonse(data) {
  var table = document.getElementById('myTable')
  for (var i = 0; i < data.length; i++) {
    var row = `<tr>
              <td>${i+1}</td>
							<td>${data[i].ques}</td>
							<td>${data[i].ans}</td>
							<td>${data[i].choosed}</td>
					  </tr>`
    table.innerHTML += row
  }
}
