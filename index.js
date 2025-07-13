// JavaScript for Goal-Quick Webpage

// ----------- Date and Time ----------- //
function updateDateTime() {
  const datetimeElem = document.getElementById('datetime');
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  datetimeElem.textContent = now.toLocaleString(undefined, options);
}
setInterval(updateDateTime, 1000);
updateDateTime(); // initial call

// ----------- To-Do List ----------- //
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const taskItem = document.createElement('li');
  taskItem.className = 'task';

  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  const completeBtn = document.createElement('button');
  completeBtn.innerHTML = '✔️';
  completeBtn.title = 'Complete Task';
  completeBtn.addEventListener('click', () => {
    taskItem.classList.toggle('completed');
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '🗑️';
  deleteBtn.title = 'Delete Task';
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(taskItem);
  });

  taskItem.appendChild(taskSpan);
  taskItem.appendChild(completeBtn);
  taskItem.appendChild(deleteBtn);

  taskList.appendChild(taskItem);
  taskInput.value = '';
}

// ----------- Pomodoro Timer ----------- //
let pomodoroDuration = 25 * 60; // default 25 minutes
let timer;
let isRunning = false;
let timeRemaining = pomodoroDuration;

// Get elements
const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const durationInputs = {
  focus: document.getElementById('focusDuration'),
  break: document.getElementById('breakDuration')
};

function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
  const seconds = (timeRemaining % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      alert('Time\'s up!');
    }
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  // Reset to focus duration
  const focusMinutes = parseInt(durationInputs.focus.value) || 25;
  timeRemaining = focusMinutes * 60;
  updateTimerDisplay();
}

// Event listeners for timer controls
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);

// Update durations
durationInputs.focus.addEventListener('change', () => {
  const focusMinutes = parseInt(durationInputs.focus.value) || 25;
  if (!isRunning) {
    timeRemaining = focusMinutes * 60;
    updateTimerDisplay();
  }
});
durationInputs.break.addEventListener('change', () => {
  // You can implement break timer logic similarly if needed
});

// Initialize timer display
updateTimerDisplay();

// ----------- Motivational Quote ----------- //
const quoteText = document.getElementById('quote');
const newQuoteBtn = document.getElementById('newQuoteBtn');

const quotes = [
  "The best way to get started is to quit talking and begin doing. – Walt Disney",
  "Don't let yesterday take up too much of today. – Will Rogers",
  "It's not whether you get knocked down, it's whether you get up. – Vince Lombardi",
  "If you are working on something exciting, it will keep you motivated. – Amelia Earhart",
  "Success is not in what you have, but who you are. – Bo Bennett",
  // Add more quotes as desired
];

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

function displayQuote() {
  quoteText.textContent = getRandomQuote();
}

newQuoteBtn.addEventListener('click', displayQuote);

// Show initial quote
displayQuote();