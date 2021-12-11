const settingsBtn = document.querySelector(".uil-setting");
const addInput = document.querySelector("#add-input");
const collapseMenu = document.querySelectorAll(".collapsible-menu");
const addGoalForms = document.querySelectorAll(".add-goal-form");
const addGoalInputs = document.querySelectorAll(".add-goal-form .add-input");
const addTaskInput = document.querySelector("#add-task-form .add-input");
const addTaskOptions = document.querySelector("#add-task-form .options");
const addTaskForm = document.querySelector("#add-task-form");
const toggleMenu = document.querySelector("#toggle-menu");
const pageSwitchBtn = document.querySelector("#page-toggle input")
const pomodoroContainer = document.querySelector("#pomodoro-container");
const breathContainer = document.querySelector("#breath-container");
let timeElapsed, pomodoroStatus, pageMode;


window.addEventListener("load", () => {
  // init localStorage if necessary
  if (!localStorage.getItem("pomodoroStatus")) {
    localStorage.setItem("pomodoroStatus", "inactive");
  }

  if (!localStorage.getItem("timeElapsed")) {
    localStorage.setItem("timeElapsed", 0);
  }

  if (!localStorage.getItem("pageMode")) {
    localStorage.setItem("pageMode", "focus");
  } 

  timeElapsed = localStorage.getItem("timeElapsed");
  pomodoroStatus = localStorage.getItem("pomodoroStatus");
  pageMode = localStorage.getItem("pageMode");

  // get today's full date
  const todayFullDate = new Date();

  // add today's date
  const dateToday = document.querySelector("#date-today");
  dateToday.textContent = todayFullDate.toDateString();

  // change greeting message
  switchGreetingMsg(todayFullDate.getHours());

  if (pageMode === "focus") {
    pomodoroContainer.classList.toggle("active");
    updatePomodoro(timeElapsed, pomodoroStatus);
    pageSwitchBtn.checked = false;
  } else {
    breathContainer.classList.toggle("active");
    pageSwitchBtn.checked = true;
  }
  
})

// toggle the settings menu
const toggleLinks = document.querySelector("#toggle-links");
settingsBtn.addEventListener("click", () => {
  toggleLinks.classList.toggle('active');
})

// toggle dropdown menus
collapseMenu.forEach(menu => {
  const collapseBtn = menu.querySelector(".collapsible-btn");
  const collapseContent = menu.querySelector(".collapsible-content");

  collapseBtn.addEventListener("click", () => {
    if (collapseContent.style.display === "none") {
      collapseContent.style.display = "block";
      collapseBtn.classList.remove("uil-angle-right");
      collapseBtn.classList.add("uil-angle-down");
    } else {
      collapseContent.style.display = "none";
      collapseBtn.classList.remove("uil-angle-down");
      collapseBtn.classList.add("uil-angle-right");
    }
  })
})

// display new task options on focus
addTaskInput.addEventListener("focus", () => {
  addTaskOptions.classList.add("active");
  addTaskInput.classList.add("active");
})

// display new goal options on focus
addGoalForms.forEach((form) => {
  form.querySelector(".add-input").addEventListener("focus", () => {
    form.querySelector(".options").classList.add("active");
  })
})

document.addEventListener("click", event => {
  // hide task options
  if (!addTaskForm.contains(event.target)) {
    addTaskOptions.classList.remove("active");
    addTaskInput.classList.remove("active");
    addTaskInput.value = "";
  }

  // hide goal options
  addGoalForms.forEach((form) => {
    if (!form.contains(event.target)) {
      form.querySelector(".options").classList.remove("active");
    }
  })

  // hide settings menu
  if (!toggleMenu.contains(event.target)) {
    toggleLinks.classList.remove("active");
  }
})

// pomodoro timer interation
pomodoroBtn.addEventListener("click", () => {
  if (pomodoroBtn.className === "start") {
    pomodoroStart();
  } else {
    pomodoroStop(pomodoroTimer);
  }
})

// change greeting message
function switchGreetingMsg(hour) {
  const greetingMsg = document.querySelector("#greeting-msg");

  switch(true) {
    case hour > 4 && hour < 13:
      greetingMsg.textContent = "Good morning,";
      break;
    case hour < 18:
      greetingMsg.textContent = "Good afternoon,";
      break;
    case hour < 23:
      greetingMsg.textContent = "Good evening,";
      break;
    default:
      greetingMsg.textContent = "Good night," ;
      break;
  }
}

pageSwitchBtn.addEventListener("click", () => {
  if (pageMode === "focus") {
    localStorage.setItem("pageMode", "relax");
    pageMode = "relax";
    pomodoroContainer.classList.toggle("active");
    breathContainer.classList.toggle("active");
  } else {
    localStorage.setItem("pageMode", "focus");
    pageMode = "focus";
    pomodoroContainer.classList.toggle("active");
    breathContainer.classList.toggle("active");
    updatePomodoro(timeElapsed, pomodoroStatus);
  }
})