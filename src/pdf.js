const generatePDF = function () {
  const pdfObject = jsPDFInvoiceTemplate.default(props);
};

// Define your props object with a more structured format
const props = {
  outputType: jsPDFInvoiceTemplate.OutputType.Save,
  returnJsPDFDocObject: true,
  fileName: 'MyTax',
  orientationLandscape: false,
  compress: true,
  logo: {
    src: './images/stamp.png',
    type: 'PNG',
    width: 53.33,
    height: 26.66,
    margin: {
      top: 0,
      left: 0,
    },
  },
  stamp: {
    inAllPages: true,
    src: '',
    type: 'JPG',
    width: 20,
    height: 20,
    margin: {
      top: 0,
      left: 0,
    },
  },
  business: {
    name: 'Neti-Cents',
    address: 'PH Income Tax Calculator',
    email: 'neti-cents@netizens.ph',
    website: 'https://nathanielseth.github.io/Neti-Cents',
  },
  invoice: {
    header: [
      { title: '#', style: { width: 10, height: 20 } },
      { title: '', style: { width: 50, height: 20 } },
      { title: '', style: { width: 90, height: 20 } },
      { title: 'Total', style: { width: 50, height: 20 } },
    ],
    table: [
      [1, 'Gross Income', '', '₱0.00'],
      [2, 'Withholding Tax', '', '₱0.00'],
      [3, 'GSIS Contribution', '', '₱0.00'],
      [4, 'SSS Contribution', '', '₱0.00'],
      [5, 'Mandatory Provident Fund', '', '₱0.00'],
      [6, 'PhilHealth Contribution', '', '₱0.00'],
      [7, 'Pag-ibig Contribution', '', '₱0.00'],
      [8, 'Taxable Income', '', '₱0.00'],
    ],

    invDescLabel: 'Disclaimer',
    invDesc:
      'This PDF was generated based on the 2024 tax data, and may not reflect future changes accurately.',
  },
  footer: {
    text: 'nathanielseth.dev',
  },
};
