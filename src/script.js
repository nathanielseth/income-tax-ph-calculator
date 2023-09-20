// format number for readability
// const formatNumber = function (input) {
//   let number = input.replace(/[^0-9]/g, '');
//   number = number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//   return number;
// };

let mybutton = document.getElementById('btn-back-to-top');

const backToTop = function () {
  mybutton.style.display = 'none';
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

mybutton.addEventListener('click', backToTop);

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = 'block';
  } else {
    mybutton.style.display = 'none';
  }
};

// type animation
const textArray = [
  'Calculator for PH income tax!',
  'Calculate your MP2 investments!',
  'Make it make sense!',
  'Financial calculator for the netizens!',
  'An open-source project!',
  'Updated for 2024!',
];

const typewriterText = document.getElementById('typewriter-text');
let textIndex = 0;
let charIndex = 0;
let isTyping = true;

const type = function () {
  if (charIndex < textArray[textIndex].length) {
    typewriterText.textContent += textArray[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 60);
  } else {
    isTyping = false;
    setTimeout(erase, 5500);
  }
};

const erase = function () {
  if (isTyping) {
    typewriterText.textContent =
      textArray[textIndex].substring(0, charIndex - 1) + '|';
    isTyping = false;
    setTimeout(erase, 25);
  } else {
    typewriterText.textContent = textArray[textIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    if (charIndex === 0) {
      textIndex = (textIndex + 1) % textArray.length;
      isTyping = true;
      setTimeout(type, 1000);
    } else {
      setTimeout(erase, 50);
    }
  }
};

type();
