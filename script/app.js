import { facts } from "./factsForquestion.js";

const nextButton = document.getElementById("next-question");
//const previousButton = document.getElementById("previos-question");
const optionButtons = document.getElementById("options").children;
const explanation = document.getElementById("explanation");
const progressTracking = document.querySelector(".progress-tracking");

let fact;
let correct = 0;
let completed = 0;

function hideExplanation(element) {
  element.classList.add("hidden");
}

function showExplanation(element) {
  element.classList.remove("hidden");
}

const disableBtn = (button) => button.setAttribute("disabled", "");
const enableBtn = (button) => button.removeAttribute("disabled");

nextButton.addEventListener("click", getNextFactToQuestion);

function getNextFactToQuestion() {
  fact = facts.shift(); // get the first fact in our array (shortening the array)
  const factToQuestion = document.getElementById("statement");
  factToQuestion.textContent = fact.statement;

  // hide any previous explanation
  hideExplanation(explanation);

  console.log(factToQuestion.textContent);

  for (let option of optionButtons) {
    // clear any previous classes
    option.classList.remove("correct");
    option.classList.remove("incorrect");
    // make sure buttons are enabled
    enableBtn(option);
  }

  disableBtn(nextButton);
}

for (let option of optionButtons) {
  option.addEventListener("click", (e) => {
    // When this option is clicked...

    // disable all the option buttons
    for (let button of optionButtons) {
      disableBtn(button);
    }

    // enable the 'next question' button, if we still have facts left
    if (facts.length > 0) {
      enableBtn(nextButton);
    } else {
      nextButton.textContent = "No more questions!";
    }

    const guess = e.target.value;
    if (guess === fact.answer) {
      e.target.classList.add("correct");
      correct++;
    } else {
      e.target.classList.add("incorrect");
    }

    explanation.textContent = fact.explanation;
    showExplanation(explanation);

    // update the score
    completed++;
    const totalQuestions = completed + facts.length;
    document.getElementById("correct").textContent = correct;
    document.getElementById("completed").textContent = completed;
    progressTracking.style.width = `${(completed / totalQuestions) * 100}%`;
    progressTracking.innerHTML = `${Math.ceil(
      (completed / totalQuestions) * 100
    )}%`;
  });
}

getNextFactToQuestion();

let finalValue = 100;
let max = 50;

function changeProgressBar() {
  progressTracking.style.width = `50%`;
}
