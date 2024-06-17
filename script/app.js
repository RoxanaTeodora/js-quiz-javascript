const nextButton = document.getElementById("next-question");
const previousButton = document.getElementById("previos-question");
const optionButtons = document.getElementById("options").children;
const explanation = document.getElementById("explanation");
const progressTracking = document.querySelector(".progress-tracking");

const facts = [
  {
    statement: "JavaScript was invented in 1995",
    answer: "true",
    explanation:
      "Brendan Eich created JS at Netscape in 1995. The initial version of the language was written in just 10 days.",
  },
  {
    statement: "Strings in JS are editable values",
    answer: "false",
    explanation:
      "In JavaScript strings are immutable values, meaning they cannot be edited; however, they can replaced with new, different strings.",
  },
  {
    statement: "1 + 1 === 2",
    answer: "true",
    explanation: "The plus operator gives the sum of two numbers.",
  },
  {
    statement: "'1' + '1' === '2'",
    answer: "false",
    explanation:
      "The plus operator concatenates (joins together) strings, so '1' + '1' === '11'.",
  },
  {
    statement: "typeof ['J', 'S'] === 'array'",
    answer: "false",
    explanation:
      "Arrays have the type 'object'. In JS, everything is either a primitive data type (e.g. 'string', 'number') or an object. Arrays are a kind of object with some special properties.  ",
  },
];

let fact;
let correct = 0;
let completed = 0;

const hideExplanation = (explanation) => explanation.classList.add("hidden");
const showExplanation = (explanation) => explanation.classList.remove("hidden");

const disableBtn = (button) => button.setAttribute("disabled", "");
const enableBtn = (button) => button.removeAttribute("disabled");

nextButton.addEventListener("click", getNextFactToQuestion);

function getNextFactToQuestion() {
  fact = facts.shift(); // get the first fact in our array (shortening the array)
  const factToQuestion = document.getElementById("statement");
  factToQuestion.textContent = fact.statement;

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

//previousButton.addEventListener("click", goTothePriviousQuestion);

// function goTothePriviousQuestion() {
//   //console.log("merge");
//   fact = facts[facts.length - 1]; // get the privious fact in our array
//   const factToQuestion = document.getElementById("statement");
//   factToQuestion.textContent = fact.statement;

//   // hide any previous explanation
//   hide(explanation);
//   console.log(factToQuestion.textContent);

//   for (let option of optionButtons) {
//     // clear any previous classes
//     option.classList.remove("correct");
//     option.classList.remove("incorrect");
//     // make sure buttons are enabled
//     enable(option);
//   }

//   // disable next-question button
//   disable(nextButton);
// }

getNextFactToQuestion();

let finalValue = 100;
let max = 50;

function changeProgressBar() {
  progressTracking.style.width = `50%`;
  progressTracking.innerHTML = `50%`;
  // finalValue = facts.length;
  // max = correct;
  // console.log(max);
}
