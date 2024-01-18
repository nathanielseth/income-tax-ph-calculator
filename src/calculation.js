"use strict";

// DOM Elements
const elements = {
	// input elements
	monthlySalary: document.getElementById("monthlySalary"),
	allowance: document.getElementById("allowance"),
	allowanceTaxable: document.getElementById("allowanceTaxable"),
	sectorInputs: document.querySelectorAll('input[name="sector"]'),
	periodInputs: document.querySelectorAll('input[name="period"]'),

	// output elements
	grossIncome: document.getElementById("grossIncome"),
	sssAmount: document.getElementById("sssAmount"),
	mpfAmount: document.getElementById("mpfAmount"),
	philhealthAmount: document.getElementById("philhealthAmount"),
	pagibigAmount: document.getElementById("pagibigAmount"),
	totalDeductions: document.getElementById("totalDeductions"),
	taxableIncome: document.getElementById("taxableIncome"),
	withholdingTax: document.getElementById("withholdingTax"),
	taxDue: document.getElementById("taxDue"),
	takeHomePay: document.getElementById("takeHomePay"),
};

const updateElementValue = (element, value) => {
	const monthlySalary = parseFormattedNumber(
		document.getElementById("monthlySalary").value
	);
	const formattedValue = monthlySalary === 0 ? "0.00" : value.toFixed(2);
	element.innerText = numberFormat(formattedValue);
};

// functions for formatting & readability
const numberFormat = (num) =>
	num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const parseFormattedNumber = (str) => {
	const parsedValue = parseFloat(str.replace(/[^0-9.]/g, ""));
	return isNaN(parsedValue) ? 0.0 : parsedValue;
};
// function to handle input elements
const handleInput = (elementId, callback) => {
	const element = document.getElementById(elementId);
	element.addEventListener("input", () => {
		element.value = numberFormat(parseFormattedNumber(element.value));
		calculateTax();
	});
};

handleInput("monthlySalary");
handleInput("allowance");

// contribution functions

const bracket = (lower, upper) => (income) =>
	(isNaN(lower) || income >= lower) && (isNaN(upper) || income <= upper);

const bracketPhilHealth = [
	[NaN, 10000, () => 500],
	[10000.01, 99999.99, (mon) => mon * 0.05],
	[100000, NaN, () => 5000],
];

const computePhilHealth = (monthly) => {
	return (
		bracketPhilHealth
			.filter((phBracket) => bracket(phBracket[0], phBracket[1])(monthly))
			.reduce(
				(contribution, phBracket) => (contribution += phBracket[2](monthly)),
				0
			) * 0.5
	);
};

const bracketSSS = (lower, upper) => (income) =>
	(isNaN(lower) || income >= lower) && (isNaN(upper) || income < upper);

const computeSSS = (salary) => {
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

// tax due function
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

// main function to calculate tax
const calculateTax = function () {
	// input values
	const monthlySalary = parseFormattedNumber(
		document.getElementById("monthlySalary").value
	);
	const allowance = parseFormattedNumber(
		document.getElementById("allowance").value
	);
	// check forms
	const allowanceTaxable = document.getElementById("allowanceTaxable").checked;
	const sector = document.querySelector('input[name="sector"]:checked').value;
	const period = document.querySelector('input[name="period"]:checked').value;

	const switchLabel = document.getElementById("switch-label");

	const mpfLabel = "Mandatory Provident Fund";
	const gsisLabel = "GSIS Contribution";

	let grossIncome =
		period === "annually"
			? monthlySalary * 12
			: period === "biweekly"
			? monthlySalary / 2
			: monthlySalary;

	if (allowanceTaxable) {
		grossIncome += allowance;
	}

	let sssContribution = 0;
	let mpfContribution = 0;
	let gsisContribution = 0;
	let pagibigContribution = 100;
	let philhealthContribution = computePhilHealth(monthlySalary);

	if (sector === "private") {
		sssContribution = computeSSS(grossIncome).sss;
		mpfContribution = computeSSS(grossIncome).mpf;

		if (period === "annually") {
			sssContribution *= 12;
			mpfContribution *= 12;
			gsisContribution = grossIncome * 0.09 * 12;
			pagibigContribution = 1200;
			philhealthContribution *= 12;
		} else if (period === "bi-weekly") {
			sssContribution /= 2;
			mpfContribution /= 2;
			gsisContribution = (grossIncome * 0.09) / 2;
			philhealthContribution /= 2;
		}

		switchLabel.textContent = mpfLabel;
	} else if (sector === "public") {
		gsisContribution = grossIncome * 0.09;
		mpfContribution = gsisContribution;

		if (period === "annually") {
			gsisContribution *= 12;
		} else if (period === "bi-weekly") {
			gsisContribution /= 2;
		}

		switchLabel.textContent = gsisLabel;
	}

	let totalDeductions =
		sssContribution +
		mpfContribution +
		philhealthContribution +
		pagibigContribution;

	let taxableIncome = grossIncome - totalDeductions;

	let taxableAnnualIncome =
		period === "monthly"
			? taxableIncome * 12
			: period === "bi-weekly"
			? taxableIncome * 26
			: taxableIncome;

	let withholdingTax =
		period === "annually"
			? computeWithholdingTax(taxableAnnualIncome) * 12
			: period === "bi-weekly"
			? computeWithholdingTax(taxableAnnualIncome) / 26
			: computeWithholdingTax(taxableAnnualIncome);

	let taxDue = totalDeductions + withholdingTax;

	let takeHomePay = grossIncome - taxDue;

	if (!allowanceTaxable) {
		takeHomePay += allowance;
	}

	updateElementValue(elements.grossIncome, grossIncome);
	updateElementValue(elements.sssAmount, sssContribution);
	updateElementValue(elements.mpfAmount, mpfContribution);
	updateElementValue(elements.philhealthAmount, philhealthContribution);
	updateElementValue(elements.pagibigAmount, pagibigContribution);
	updateElementValue(elements.taxableIncome, taxableIncome);
	updateElementValue(elements.withholdingTax, withholdingTax);
	updateElementValue(elements.totalDeductions, totalDeductions);
	updateElementValue(elements.taxDue, taxDue);
	updateElementValue(elements.takeHomePay, takeHomePay);

	let summaryTable = [
		[1, "Gross Income", "", grossIncome.toFixed(2)],
		[1, "Allowance", "", allowance.toFixed(2)],
		[2, "Withholding Tax", "", withholdingTax.toFixed(2)],
		[3, "SSS Contribution", "", sssContribution.toFixed(2)],
		[4, "SSS Mandatory Provident Fund", "", mpfContribution.toFixed(2)],
		[5, "GSIS Contribution", "", gsisContribution.toFixed(2)],
		[6, "PhilHealth Contribution", "", philhealthContribution.toFixed(2)],
		[7, "Pag-ibig Contribution", "", pagibigContribution.toFixed(2)],
		[8, "Total Contribution", "", totalDeductions.toFixed(2)],
		[9, "Taxable Income", "", taxableIncome.toFixed(2)],
		[10, "Total Tax Due", "", taxDue.toFixed(2)],
		[11, "Net Income", "", takeHomePay.toFixed(2)],
	];

	props.invoice.table = summaryTable;

	// check if pdf dl button should be enabled
	const checkTakeHomePay = function () {
		const takeHomePayElement = document.getElementById("takeHomePay");
		const downloadBtn = document.getElementById("downloadBtn");
		const takeHomePay = parseFloat(takeHomePayElement.textContent);

		if (takeHomePay > 0) {
			downloadBtn.removeAttribute("disabled");
		} else {
			downloadBtn.setAttribute("disabled", "true");
		}
	};
	checkTakeHomePay();
};
