"use strict";

// selecting html elements
const quoteEl = document.querySelector(".quote");
const authorEl = document.querySelector(".author");
const quoteContainer = document.querySelector(".quote-container");
const authorContainer = document.querySelector(".author-container");
const blurEl = document.querySelector(".blurBody");
const socialIcons = document.querySelector(".socialIcons");
const shareBtn = document.querySelector(".share");
const newBtn = document.querySelector(".new");
const htmlSection = document.querySelector("section");
const loaderEl = document.querySelector('.loader')
const htmlMain = document.querySelector('main');


// set quotes as a global variable
let quotes = [];


// function to display loader 
function showLoader() { 
  loaderEl.style.display = "block";
  htmlMain.style.display = "none";
}

// function to hide loader
function hideLoader() { 
  loaderEl.style.display = "none";
  htmlMain.style.display ='flex';
}

// this function updates the content of the html elements (quote & author)
function newQuote() {
  showLoader();

  quoteEl.textContent = quotes[0].quote;
  authorEl.textContent = quotes[0].author;
  quoteContainer.classList.add("show");
  authorContainer.classList.add("show");
}

// API options object
const apiConfig = {
  method: "GET",
  headers: {
    "X-Api-Key": "q8x8ObaSxjqbCKzxEG8fKw==zmLcLYl1dI4wROvo",
  },
};

// Get data from API using async function
const fetchQuotes = async function () {
  try {
    // initial loading
    showLoader();
    // request data
    const response = await fetch(
      "https://api.api-ninjas.com/v1/quotes?category=",
      apiConfig
    );

    // converting data to JSON
    quotes = await response.json();
    newQuote();
    // removing loader 
    hideLoader();
  } catch (err) {
    // errors are catched here
    alert(err);
  }
};

// function for the share button
function newShare() {
  blurEl.style.display = "block";
  socialIcons.style.display = "block";
  // fading animation
  blurEl.classList.add("show");
  socialIcons.classList.add("show");
}

// function to close popup of social icons
function closeSocialIcons() {
  blurEl.style.display = "none";
  socialIcons.style.display = "none";
}

// onload
showLoader();
fetchQuotes();

// clicking the New button
newBtn.addEventListener("click", fetchQuotes);

// clicking the Shared button
shareBtn.addEventListener("click", newShare);

// clicking outside of social icons card(blurEL) should close the popup
blurEl.addEventListener("click", closeSocialIcons);
