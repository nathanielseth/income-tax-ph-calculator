// format number for readability
const formatNumber = function (input) {
  let number = input.replace(/[^0-9]/g, '');
  number = number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return number;
};

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
