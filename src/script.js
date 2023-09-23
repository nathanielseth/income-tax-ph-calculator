const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const toggleBackToTopButton = () => {
  const mybutton = document.getElementById('btn-back-to-top');
  mybutton.style.display = window.pageYOffset > 20 ? 'block' : 'none';
};

const typeAnimation = () => {
  const textArray = [
    'Calculator for PH salary income tax!',
    'Speedy calculations for you!',
    'Financial calculator for the netizens!',
    'An open-source project!',
    'Updated for 2024!',
  ];

  const typewriterText = document.getElementById('typewriter-text');
  let textIndex = 0;
  let charIndex = 0;
  let isTyping = true;

  const type = () => {
    if (charIndex < textArray[textIndex].length) {
      typewriterText.textContent += textArray[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 60);
    } else {
      isTyping = false;
      setTimeout(erase, 5500);
    }
  };

  const erase = () => {
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
};

const submitForm = (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (name.trim() === '') {
    alert('Please enter your name.');
    return;
  }

  if (email.trim() === '' || !isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (message.trim() === '') {
    alert('Please enter your message.');
    return;
  }

  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';

  alert('This is a demo form!');
};

const isValidEmail = function (email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

document.addEventListener('DOMContentLoaded', () => {
  const mybutton = document.getElementById('btn-back-to-top');
  if (mybutton) {
    mybutton.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', toggleBackToTopButton);
  }

  typeAnimation();

  const submitButton = document.querySelector('form button[type="submit"]');
  if (submitButton) {
    submitButton.addEventListener('click', submitForm);
  }
});
