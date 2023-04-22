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
const facebookBtn = document.querySelector(".facebook");
const instagramBtn = document.querySelector(".instagram");
const whatsappBtn = document.querySelector(".whatsapp");

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

// displayed content


// social media urls


////////////////////////////////////////////////////////////
// FUNCTIONS
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
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteEl.textContent} - ${authorEl.innerText}`
  window.open(twitterUrl, "_blank");
}

// function for facebook
function facebookShare() {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`${quoteEl.textContent} - ${authorEl.innerText}`)}`;

  window.open(facebookUrl, "_blank");
}

// function for instagram
// function instagramShare() {
//   const instagramUrl = `https://www.instagram.com/share?url=${encodeURIComponent(window.location.href)}&caption=${encodeURIComponent(${quoteEl.textContent} - ${authorEl.innerText})}`
//   window.open(instagramUrl, "_blank");
// }

// // function for twitter
// function twitterShare() {
//   const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteEl.textContent} - ${authorEl.innerText}`
//   window.open(twitterUrl, "_blank");
// }

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
facebookBtn.addEventListener("click", facebookShare);
