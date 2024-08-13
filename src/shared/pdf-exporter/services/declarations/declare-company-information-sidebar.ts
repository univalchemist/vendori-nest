import { declareAddress } from './declare-address';
import { PDFImages } from '../../images';

export function declareCompanyInformationSidebar(
  company: any,
  companyAddress: any,
) {
  const {
    logoUrl,
    subdomain,
    websiteUrl,
    companyName,
    companyEmail,
    bankName,
    bankAccountNumber,
    bankRoutingNumber,
  } = company;

  const stack: any[] = logoUrl
    ? [
        {
          image: PDFImages.CompanyLogo,
          fit: [106, 40],
        },
      ]
    : [];

  stack.push(
    {
      text: companyName,
      margin: [0, 18, 0, 0],
      fontSize: 8,
      italics: true,
      color: '#000',
    },
    {
      ...declareAddress(companyAddress),
      margin: [0, 6, 0, 0],
      fontSize: 7,
      bold: true,
      color: '#000',
    },
    {
      stack: [
        {
          text: companyAddress.email || companyEmail,
          fontSize: 7,
          color: '#000',
          decoration: 'underline',
          decorationStyle: 'solid',
          decorationColor: 'black',
        },
        {
          text: websiteUrl || `https://${subdomain}.vendori.com`,
          fontSize: 7,
          color: '#000',
          decoration: 'underline',
          decorationStyle: 'solid',
          decorationColor: 'black',
        },
      ],
      margin: [0, 6, 0, 0],
    },
    {
      stack: [
        {
          text: 'Seller Bank',
          fontSize: 7,
          bold: true,
          color: '#000',
        },
        {
          text: bankName,
          fontSize: 7,
          color: '#000',
        },
      ],
      margin: [0, 24, 0, 0],
    },
    {
      stack: [
        { text: 'Routing', bold: true, fontSize: 7, color: '#000' },
        { text: bankRoutingNumber, fontSize: 7, color: '#000' },
      ],
      margin: [0, 6, 0, 0],
    },
    {
      stack: [
        { text: 'Account', bold: true, color: '#000' },
        { text: bankAccountNumber, color: '#000' },
      ],
      margin: [0, 6, 0, 0],
    },
  );

  return {
    columns: [
      {
        stack,
        width: '106',
      },
    ],
  };
}
