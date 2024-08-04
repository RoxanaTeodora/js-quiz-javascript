import { facts } from "./factsForquestion.js";

const nextButton = document.getElementById("next-question");
const previousButton = document.getElementById("previos-question");
const optionButtons = document.getElementById("options").children;
const explanation = document.getElementById("explanation");
const progressTracking = document.querySelector(".progress-tracking");

let currentFact;
let correct = 0;
let completed = 0;
const totalQuestions = facts.length;
let historyRemainingFacts = [...facts];
let historyCompletedFactIds = [];
let historyAnsweredFactIds = [];

function hideExplanation(element) {
  element.classList.add("hidden");
}

function showExplanation(element) {
  element.classList.remove("hidden");
}

const disableBtn = (button) => button.setAttribute("disabled", "");
const enableBtn = (button) => button.removeAttribute("disabled");

nextButton.addEventListener("click", getNextFactToQuestion);
previousButton.addEventListener("click", goToThePreviousQuestion);

function getNextFactToQuestion() {
  if (historyRemainingFacts.length === 0) {
    alert("No more questions!");
    return;
  }

  if (currentFact && !historyCompletedFactIds.includes(currentFact.id)) {
    historyCompletedFactIds.push(currentFact.id);
  }

  if (currentFact) {
    historyAnsweredFactIds.push(currentFact.id);
  }
  currentFact = historyRemainingFacts.shift();
  if (!currentFact) return;

  const factToQuestion = document.getElementById("statement");
  factToQuestion.textContent = currentFact.statement;

  hideExplanation(explanation);

  console.log(factToQuestion.textContent);

  for (let option of optionButtons) {
    option.classList.remove("correct");
    option.classList.remove("incorrect");
    enableBtn(option);
  }

  if (historyRemainingFacts.length > 0) {
    enableBtn(nextButton);
  } else {
    nextButton.textContent = "No more questions!";
  }

  if (historyAnsweredFactIds.length > 0) {
    enableBtn(previousButton);
  } else {
    disableBtn(previousButton);
  }
}

function goToThePreviousQuestion() {
  if (historyAnsweredFactIds.length === 0) return;

  const previousFactId = historyAnsweredFactIds.pop();
  currentFact = facts.find((fact) => fact.id === previousFactId);

  if (!currentFact) return;

  const factToQuestion = document.getElementById("statement");
  factToQuestion.textContent = currentFact.statement;

  hideExplanation(explanation);
  console.log(factToQuestion.textContent);

  for (let option of optionButtons) {
    option.classList.remove("correct");
    option.classList.remove("incorrect");
    enableBtn(option);
  }

  if (historyAnsweredFactIds.length === 0) {
    disableBtn(previousButton);
  }

  if (historyRemainingFacts.length > 0) {
    enableBtn(nextButton);
  }

  if (!historyRemainingFacts.includes(currentFact)) {
    historyRemainingFacts.unshift(currentFact);
  }

  if (
    historyCompletedFactIds.includes(currentFact.id) &&
    historyCompletedFactIds > 0
  ) {
    historyCompletedFactIds = historyCompletedFactIds.filter(
      (id) => id !== currentFact.id
    );
    correct--;
    completed--;
    updateScore();
  }
}

for (let option of optionButtons) {
  option.addEventListener("click", (e) => {
    for (let button of optionButtons) {
      disableBtn(button);
    }

    if (historyRemainingFacts.length > 0) {
      enableBtn(nextButton);
    } else {
      nextButton.textContent = "No more questions!";
    }

    const guess = e.target.value;
    if (guess === currentFact.answer) {
      e.target.classList.add("correct");

      if (!historyCompletedFactIds.includes(currentFact.id)) {
        if (correct < totalQuestions) {
          correct++;
        }
      }
    } else {
      e.target.classList.add("incorrect");
    }

    explanation.textContent = currentFact.explanation;
    showExplanation(explanation);

    // update score
    if (!historyCompletedFactIds.includes(currentFact.id)) {
      completed++;
      historyCompletedFactIds.push(currentFact.id);
    }
    updateScore();
  });
}

function updateScore() {
  document.getElementById("correct").textContent = correct;
  document.getElementById("completed").textContent = Math.min(
    completed,
    totalQuestions
  );
  progressTracking.style.width = `${
    (Math.min(completed, totalQuestions) / totalQuestions) * 100
  }%`;
  progressTracking.innerHTML = `${Math.ceil(
    (Math.min(completed, totalQuestions) / totalQuestions) * 100
  )}%`;
}

getNextFactToQuestion();
