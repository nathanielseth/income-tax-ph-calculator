'use strict';

// check if an element is in the viewport
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// handle scroll animations
const handleScrollAnimations = () => {
  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

  elementsToAnimate.forEach((element) => {
    if (isInViewport(element)) {
      element.classList.add('visible');
    }
  });
};

// animation for link boxes
const animateResourceBox = (element, delay) => {
  setTimeout(() => {
    element.classList.add('visible');
    element.style.transform = 'translateY(0)';
    element.style.opacity = '1';
  }, delay);
};
const handleScrollAnimations2 = () => {
  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll2');
  const animationDelay = 100;

  elementsToAnimate.forEach((element, index) => {
    if (isInViewport(element)) {
      const delay = index * animationDelay;
      animateResourceBox(element, delay);
    }
  });
};

window.addEventListener('scroll', handleScrollAnimations);
document.addEventListener('DOMContentLoaded', handleScrollAnimations);

window.addEventListener('scroll', handleScrollAnimations2);
document.addEventListener('DOMContentLoaded', handleScrollAnimations2);
