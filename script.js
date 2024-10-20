"use strict";
const inputCountainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.querySelector(".countdown-title");
// const btnEl = document.querySelector(".complete-button");
const countdownBtn = document.querySelector(".countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeElInfo = document.querySelector(".comlplete-info");
const completeBtn = document.querySelector(".complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdowActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// set date input min todays
const today = new Date().toISOString().split("T")[0];
// console.log(today);
dateEl.setAttribute("min", today);

// populate Countdown / Complete UI
function updateDom() {
  countdowActive = setInterval(() => {
    // populate countdown / complete  UI
    const now = new Date().getTime();
    const distance = countdownValue - now;
    // console.log("distance", distance);

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    // console.log(days, hours, minutes, seconds);

    // hide input
    inputCountainer.hidden = true;
    // console.log(inputCountainer);

    // if the countdown has ended, show complete
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdowActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // else, show the countdown in progress
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}

// take value from Form input
function updateCountDown(e) {
  // console.log(e);
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  console.log(savedCountdown);
  localStorage.setItem("countdown", JSON.stringify(savedCountdown));
  // console.log(countdownTitle, countdownDate);
  // check a valid for date
  if (countdownDate === "") {
    alert("please unput a date");
  } else {
    // get number version of current date, update dom
    countdownValue = new Date(countdownDate).getTime();
    // console.log("countdown value:", countdownValue);
    updateDom();
  }
}

// reset Countdown
// hide countdown
function resetCount() {
  // console.log("you click");
  inputCountainer.hidden = false;
  countdownEl.hidden = true;
  completeEl.hidden = true;
  // stop the countdown
  clearInterval(countdowActive);
  // reset values
  let countdownTitle = "";
  let countdownDate = "";
  localStorage.removeItem("countdown");
}

function restorePreviousCountdown() {
  // Get countdown from localStorage if available
  if (localStorage.getItem("countdown")) {
    inputCountainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
}

countdownForm.addEventListener("submit", updateCountDown);
countdownBtn.addEventListener("click", resetCount);
completeBtn.addEventListener("click", resetCount);

// on load, check localStorage
restorePreviousCountdown();
