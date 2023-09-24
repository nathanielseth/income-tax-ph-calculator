const generatePDF = function () {
  const pdfObject = jsPDFInvoiceTemplate.default(props);
};

const currentDate = new Date();
const formattedDate = `${currentDate.getFullYear()}-${(
  currentDate.getMonth() + 1
)
  .toString()
  .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

const formattedTime = `${currentDate
  .getHours()
  .toString()
  .padStart(2, '0')}:${currentDate
  .getMinutes()
  .toString()
  .padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

const props = {
  outputType: jsPDFInvoiceTemplate.OutputType.Save,
  returnJsPDFDocObject: true,
  fileName: 'MyTax',
  orientationLandscape: true,
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
    label: 'Income Tax & Contributions for ',
    num: `${currentDate.getFullYear()}`,
    invDate: `Date Generated: ${formattedDate}`,
    invGenDate: `Time Generated: ${formattedTime}`,
    headerBorder: false,
    tableBodyBorder: false,
    header: [
      { title: '#', style: { width: 30, fontSize: 20 } },
      { title: '', style: { width: 100, fontSize: 20 } },
      { title: '', style: { width: 100, fontSize: 20 } },
      { title: 'Total', style: { width: 50, fontSize: 20 } },
    ],
    table: [
      [2, 'Withholding Tax', '', '₱0.00'],
      [3, 'GSIS Contribution', '', '₱0.00'],
      [4, 'SSS Contribution', '', '₱0.00'],
      [5, 'Mandatory Provident Fund', '', '₱0.00'],
      [6, 'PhilHealth Contribution', '', '₱0.00'],
      [7, 'Pag-ibig Contribution', '', '₱0.00'],
      [8, 'Taxable Income', '', '₱0.00'],
    ],
    additionalRows: [
      {
        col1: 'Gross Income',
        col2: 'put the gross income value here',
        col3: '-',
        style: {
          fontSize: 14,
        },
      },
      {
        col1: 'Total Tax Due',
        col2: 'put tax due here',
        col3: '-',
        style: {
          fontSize: 10,
        },
      },
      {
        col1: 'Net Income',
        col2: 'put net income here',
        col3: '-',
        style: {
          fontSize: 10,
        },
      },
    ],
    invDescLabel: 'Disclaimer',
    invDesc:
      'This PDF was generated based on the 2024 tax data, and may not reflect future changes accurately.',
  },
  footer: {
    text: 'nathanielseth.dev',
  },
  pageEnable: true,
  pageLabel: '',
};
