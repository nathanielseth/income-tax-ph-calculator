'use strict';

const philHealth = [
  [NaN, 10000, () => 450],
  [10000.01, 89999.99, (mon) => mon * 0.045],
  [90000, NaN, () => 4050],
];

const computePhilHealth = (monthly) => {
  return (
    philHealth
      .filter((q) => bracket(q[0], q[1])(monthly))
      .reduce((p, q) => (p += q[2](monthly)), 0) * 0.5
  );
};

const bracketSSS = (lower, upper) => (income) =>
  (isNaN(lower) || income >= lower) && (isNaN(upper) || income < upper);

const computeSss = (salary) => {
  const matrix = [
    [1000, 3250, 135, 0],
    [3250, 3750, 157.5, 0],
    [3750, 4250, 180, 0],
    [4250, 4750, 202.5, 0],
    [4750, 5250, 225, 0],
    [5250, 5750, 247.5, 0],
    [5750, 6250, 270, 0],
    [6250, 6750, 292.5, 0],
    [6750, 7250, 315, 0],
    [7250, 7750, 337.5, 0],
    [7750, 8250, 360, 0],
    [8250, 8750, 382.5, 0],
    [8750, 9250, 405, 0],
    [9250, 9750, 427.5, 0],
    [9750, 10250, 450, 0],
    [10250, 10750, 472.5, 0],
    [10750, 11250, 495, 0],
    [11250, 11750, 517.5, 0],
    [11750, 12250, 540, 0],
    [12250, 12750, 562.5, 0],
    [12750, 13250, 585, 0],
    [13250, 13750, 607.5, 0],
    [13750, 14250, 630, 0],
    [14250, 14750, 652.5, 0],
    [14750, 15250, 675, 0],
    [15250, 15750, 697.5, 0],
    [15750, 16250, 720, 0],
    [16250, 16750, 742.5, 0],
    [16750, 17250, 765, 0],
    [17250, 17750, 787.5, 0],
    [17750, 18250, 810, 0],
    [18250, 18750, 832.5, 0],
    [18750, 19250, 855, 0],
    [19250, 19750, 877.5, 0],
    [19750, 20250, 900, 0],
    [20250, 20750, 900, 22.5],
    [20750, 21250, 900, 45],
    [21250, 21750, 900, 67.5],
    [21750, 22250, 990, 90],
    [22250, 22750, 900, 112.5],
    [22750, 23250, 900, 135],
    [23250, 23750, 900, 157.5],
    [23750, 24250, 900, 180],
    [24250, 24750, 900, 202.5],
    [24750, NaN, 900, 225],
  ];

  let sss = 0;
  let mpf = 0;

  for (const bracket of matrix) {
    if (bracketSSS(bracket[0], bracket[1])(salary)) {
      sss += bracket[2];
      mpf += bracket[3];
    }
  }

  return { sss, mpf };
};

const bracket = (lower, upper) => (income) =>
  (isNaN(lower) || income >= lower) && (isNaN(upper) || income <= upper);

const computeWithholdingTax = (taxableAnnualIncome) => {
  let taxAmount = 0;

  switch (true) {
    case taxableAnnualIncome <= 250000:
      taxAmount = 0;
      break;
    case taxableAnnualIncome <= 400000:
      taxAmount = (taxableAnnualIncome - 250000) * 0.15;
      break;
    case taxableAnnualIncome <= 800000:
      taxAmount = 22500 + (taxableAnnualIncome - 400000) * 0.2;
      break;
    case taxableAnnualIncome <= 2000000:
      taxAmount = 102500 + (taxableAnnualIncome - 800000) * 0.25;
      break;
    case taxableAnnualIncome <= 8000000:
      taxAmount = 402500 + (taxableAnnualIncome - 2000000) * 0.3;
      break;
    default:
      taxAmount = 2202500 + (taxableAnnualIncome - 8000000) * 0.35;
  }
  return taxAmount / 12;
};

function calculateTax() {
  let monthlySalary = parseFloat(
    document.getElementById('monthlySalary').value
  );
  let allowance = parseFloat(document.getElementById('allowance').value);
  let allowanceTaxable = document.getElementById('allowanceTaxable').checked;
  let sector = document.querySelector('input[name="sector"]:checked').value;
  let period = document.querySelector('input[name="period"]:checked').value;

  let grossIncome =
    period === 'annually'
      ? monthlySalary * 12
      : period === 'bi-weekly'
      ? monthlySalary / 2
      : monthlySalary;

  let sssContribution;
  let mpfContribution;
  let gsisContribution;
  let pagibigContribution = 100;
  let philhealthContribution = computePhilHealth(monthlySalary);

  if (sector === 'private') {
    sssContribution = computeSss(grossIncome).sss;
    mpfContribution = computeSss(grossIncome).mpf;

    if (period === 'annually') {
      sssContribution *= 12;
      mpfContribution *= 12;
      gsisContribution = grossIncome * 0.09 * 12;
      pagibigContribution = 1200;
      philhealthContribution *= 12;
    } else if (period === 'bi-weekly') {
      sssContribution /= 2;
      mpfContribution /= 2;
      gsisContribution = (grossIncome * 0.09) / 2;
      philhealthContribution /= 2;
    }
  }

  let totalDeductions =
    sssContribution +
    mpfContribution +
    philhealthContribution +
    pagibigContribution;
  let taxableIncome = grossIncome - totalDeductions;
  let taxableAnnualIncome =
    period === 'monthly'
      ? taxableIncome * 12
      : period === 'bi-weekly'
      ? taxableIncome / 2
      : taxableIncome;

  let withholdingTax =
    period === 'annually'
      ? computeWithholdingTax(taxableAnnualIncome) * 12
      : computeWithholdingTax(taxableAnnualIncome);

  let taxDue = totalDeductions + withholdingTax;

  let takeHomePay = grossIncome - taxDue;

  document.getElementById('grossIncome').innerText = grossIncome.toFixed(2);
  document.getElementById('sssAmount').innerText = sssContribution.toFixed(2);
  document.getElementById('mpfAmount').innerText = mpfContribution.toFixed(2);
  document.getElementById('philhealthAmount').innerText =
    philhealthContribution.toFixed(2);
  document.getElementById('pagibigAmount').innerText =
    pagibigContribution.toFixed(2);
  document.getElementById('taxableIncome').innerText = taxableIncome.toFixed(2);
  document.getElementById('withholdingTax').innerText =
    withholdingTax.toFixed(2);
  document.getElementById('taxDue').innerText = taxDue.toFixed(2);
  document.getElementById('takeHomePay').innerText = takeHomePay.toFixed(2);
}
