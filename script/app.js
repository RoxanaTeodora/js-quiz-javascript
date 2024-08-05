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
let historyAnswereCorrectFactIds = [];
let historyAnsweredFactIds = [];
let currentQuestionIndex = 0;

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

// disable next question btn before answering
function validateAnswer() {
  return Array.from(optionButtons).some(
    (button) =>
      button.classList.contains("correct") ||
      button.classList.contains("incorrect")
  );
}

function getNextFactToQuestion() {
  if (currentFact && !historyAnswereCorrectFactIds.includes(currentFact.id)) {
    historyAnswereCorrectFactIds.push(currentFact.id);
  }

  if (currentFact) {
    historyAnsweredFactIds.push(currentFact.id);
  }

  if (currentQuestionIndex < totalQuestions - 1) {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);

    if (currentQuestionIndex === totalQuestions - 1) {
      nextButton.classList.add("hidden");
    }

    previousButton.classList.remove("hidden");
  }
}

function goToThePreviousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);

    if (currentQuestionIndex === 0) {
      previousButton.classList.add("hidden");
    }

    nextButton.classList.remove("hidden");
  }
}

function loadQuestion(index) {
  currentFact = facts[index];

  const factToQuestion = document.getElementById("statement");
  factToQuestion.textContent = currentFact.statement;

  hideExplanation(explanation);

  for (let option of optionButtons) {
    option.classList.remove("correct");
    option.classList.remove("incorrect");
    enableBtn(option);
  }

  disableBtn(nextButton);

  if (historyAnsweredFactIds.length > 0) {
    enableBtn(previousButton);
  } else {
    disableBtn(previousButton);
  }
}

for (let option of optionButtons) {
  option.addEventListener("click", (e) => {
    for (let button of optionButtons) {
      disableBtn(button);
    }

    if (historyRemainingFacts.length > 0) {
      enableBtn(nextButton);
    }

    const guess = e.target.value;
    if (guess === currentFact.answer) {
      e.target.classList.add("correct");

      if (!historyAnswereCorrectFactIds.includes(currentFact.id)) {
        if (correct < totalQuestions) {
          correct++;
        }
      }
    } else {
      e.target.classList.add("incorrect");
    }

    explanation.textContent = currentFact.explanation;
    showExplanation(explanation);

    if (!historyAnswereCorrectFactIds.includes(currentFact.id)) {
      completed++;
      historyAnswereCorrectFactIds.push(currentFact.id);
    }
    updateScore();

    if (historyRemainingFacts.length > 0) {
      enableBtn(nextButton);
    }

    if (historyAnsweredFactIds.length > 0) {
      enableBtn(previousButton);
    }
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

loadQuestion(currentQuestionIndex);
