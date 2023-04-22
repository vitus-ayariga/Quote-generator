"use strict";

////////////////////////////////////////////////////////////
// HTML ELEMENTS
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
const loaderEl = document.querySelector(".loader");
const htmlMain = document.querySelector("main");

// socialIcons
const twitterBtn = document.querySelector(".twitter");
const whatsappBtn = document.querySelector(".whatsapp");
const copyToClipboardBtn = document.querySelector(".copyToClipboard");

////////////////////////////////////////////////////////////
// GLOBAL VARIABLES
// set quotes as a global variable
let quotes = [];

// API options object
const apiConfig = {
  method: "GET",
  headers: {
    "X-Api-Key": "q8x8ObaSxjqbCKzxEG8fKw==zmLcLYl1dI4wROvo",
  },
};

// media query selector
const mediaQuery = window.matchMedia("(max-width: 767px)");

// social media urls

////////////////////////////////////////////////////////////
// FUNCTIONS
// media query function
function checkMediaQuery(mediaQuery) {
  if (mediaQuery.matches && quotes[0].quote.length > 120) {
    // Reduce font size for long quotes on mobile devices

    quoteEl.style.fontSize = "0.8rem";
    authorEl.style.fontSize = "0.8rem";
  }
}

// function to display loader
function showLoader() {
  loaderEl.style.display = "block";
  htmlMain.style.display = "none";
}

// function to hide loader
function hideLoader() {
  loaderEl.style.display = "none";
  htmlMain.style.display = "flex";
}

// function to update content of html elements (quote & author)
function newQuote() {
  showLoader();
  quoteEl.innerText = quotes[0].quote;
  authorEl.innerText = quotes[0].author;
  quoteContainer.classList.add("show");
  authorContainer.classList.add("show");

  // media query
  checkMediaQuery(mediaQuery); // Check initial state
  mediaQuery.addEventListener("change", checkMediaQuery); // Listen for changes in media query state
}

// async function to get data from API using
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

////// functions for sharing content
// function for twitter
function twitterShare() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteEl.textContent} - ${authorEl.innerText}`;
  window.open(twitterUrl, "_blank");
}

// // function for whatsapp
function whatsappShare() {
  const message = encodeURIComponent(
    `${quoteEl.textContent} - ${authorEl.innerText}`
  );
  const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
  window.open(whatsappUrl, "_blank");
}

// copy success function
function copySuccess() {
  const popup = document.createElement("div");
  popup.classList.add("successfulCopyPopup");
  popup.textContent = "Copied to clipboard!";
  document.body.appendChild(popup);
  const { width, height } = popup.getBoundingClientRect();
  popup.style.top = `calc(50% - ${height / 2}px)`;
  popup.style.left = `calc(50% - ${width / 2}px)`;
  setTimeout(() => {
    document.body.removeChild(popup);
  }, 1000);
}

// function to copy content to clipboard
function copyToClipboard() {
  const text = `${quoteEl.textContent} - ${authorEl.innerText}`;
  navigator.clipboard.writeText(text).then(() => {
    copySuccess();
  });
}

// onload
showLoader();
fetchQuotes();

////////////////////////////////////////////////////////////
// CLICKS
// the New button
newBtn.addEventListener("click", fetchQuotes);

// the Shared button
shareBtn.addEventListener("click", newShare);

// outside of social icons card(blurEL) should close the popup
blurEl.addEventListener("click", closeSocialIcons);

///// social icons
twitterBtn.addEventListener("click", twitterShare);
whatsappBtn.addEventListener("click", whatsappShare);
copyToClipboardBtn.addEventListener("click", () => {
  copyToClipboard();
  document.querySelector(".fa-clipboard").classList.remove("fa-beat-fade");
});
