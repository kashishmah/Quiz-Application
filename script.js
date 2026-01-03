let quizData = [
  { question: "JS Framework?", a: ".NET", b: "Flask", c: "React", d: "Django", correct: "c" },
  { question: "Not a language?", a: "HTML", b: "Python", c: "Java", d: "JS", correct: "a" },
  { question: "Not a framework?", a: "React", b: "JavaScript", c: "Angular", d: "Django", correct: "b" },
  { question: "CSS full form?", a: "Style State", b: "Style Sheet", c: "Sheet Style", d: "None", correct: "b" }
];

// 🔀 Shuffle Questions
quizData = quizData.sort(() => Math.random() - 0.5);

const answers = document.querySelectorAll(".answer");
const quiz = document.getElementById("quizdiv");
const questionEl = document.getElementById("question");
const progressEl = document.getElementById("progress");
const timerEl = document.getElementById("timer");
const submitBtn = document.getElementById("submit");

const options = {
  a: document.getElementById("a_value"),
  b: document.getElementById("b_value"),
  c: document.getElementById("c_value"),
  d: document.getElementById("d_value")
};

let index = 0;
let score = 0;
let time = 10;
let timer;

loadQuiz();

function loadQuiz() {
  reset();
  startTimer();

  const q = quizData[index];
  questionEl.innerText = q.question;
  progressEl.innerText = `Q${index + 1}/${quizData.length}`;

  options.a.innerText = q.a;
  options.b.innerText = q.b;
  options.c.innerText = q.c;
  options.d.innerText = q.d;
}

function startTimer() {
  time = 10;
  timerEl.innerText = `⏱️ ${time}s`;

  timer = setInterval(() => {
    time--;
    timerEl.innerText = `⏱️ ${time}s`;

    if (time === 0) {
      clearInterval(timer);
      autoNext();
    }
  }, 1000);
}

function reset() {
  submitBtn.disabled = true;
  answers.forEach(a => a.checked = false);
  document.querySelectorAll("li").forEach(li => li.className = "");
}

answers.forEach(a => {
  a.addEventListener("change", () => submitBtn.disabled = false);
});

submitBtn.addEventListener("click", checkAnswer);

function getSelected() {
  let ans;
  answers.forEach(a => a.checked && (ans = a.id));
  return ans;
}

function checkAnswer() {
  clearInterval(timer);

  const selected = getSelected();
  const correct = quizData[index].correct;

  document.getElementById(correct).parentElement.classList.add("correct");

  if (selected !== correct) {
    document.getElementById(selected).parentElement.classList.add("wrong");
  } else {
    score++;
  }

  setTimeout(nextQuestion, 1000);
}

function autoNext() {
  setTimeout(nextQuestion, 500);
}

function nextQuestion() {
  index++;
  if (index < quizData.length) loadQuiz();
  else showResult();
}

function showResult() {
  const percent = Math.round((score / quizData.length) * 100);
  const best = Math.max(localStorage.getItem("bestScore") || 0, percent);
  localStorage.setItem("bestScore", best);

  quiz.innerHTML = `
    <h2>🎉 Completed!</h2>
    <p>Score: ${score}/${quizData.length}</p>
    <p>Percentage: ${percent}%</p>
    <p>🏆 Best Score: ${best}%</p>
    <button class="restart-btn" onclick="location.reload()">Restart</button>
  `;
}
