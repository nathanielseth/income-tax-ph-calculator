// format number for readability
const formatNumber = function (input) {
  let number = input.replace(/[^0-9]/g, '');
  number = number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return number;
};
