// Function to add commas to numbers for better readability
function formatNumber(input) {
  // Remove existing commas and non-digit characters
  let number = input.replace(/[^0-9]/g, '');

  // Add commas every three digits from the right
  number = number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Update the input value with the formatted number
  return number;
}
