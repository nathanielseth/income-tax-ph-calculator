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

window.addEventListener('scroll', handleScrollAnimations);

document.addEventListener('DOMContentLoaded', handleScrollAnimations);
