import { PDFImages } from '../../images';
import { declareAddress } from './declare-address';

export function declareCompanyInformationInline(
  company: any,
  companyAddress: any,
) {
  const {
    companyName,
    companyEmail,
    bankName,
    bankAccountNumber,
    bankRoutingNumber,
    websiteUrl,
    subdomain,
  } = company;

  const emailAddress = companyAddress.email || companyEmail;
  const webSite = websiteUrl || `https://${subdomain}.vendori.com`;
  return {
    columns: [
      {
        columns: [
          {
            width: '30%',
            stack: [
              {
                image: PDFImages.CompanyLogo,
                fit: [106, 40],
              },
            ],
            columnGap: 5,
          },
          {
            width: '50%',
            stack: [
              {
                text: companyName,
                fontSize: 8,
                bold: true,
                color: '#000',
                margin: [0, 0, 0, 4],
              },
              {
                ...declareAddress(companyAddress),
                fontSize: 7,
                color: '#000',
              },
              {
                text: `${emailAddress} | ${webSite}`,
                fontSize: 7,
                color: '#000',
                margin: [0, 4, 0, 0],
                decoration: 'underline',
                decorationStyle: 'solid',
                decorationColor: 'black',
              },
            ],
          },
        ],
        width: '50%',
      },
      {
        columns: [
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
          },
          {
            stack: [
              { text: 'Routing', bold: true, fontSize: 7, color: '#000' },
              { text: bankRoutingNumber, fontSize: 7, color: '#000' },
            ],
          },
          {
            stack: [
              { text: 'Account', bold: true, color: '#000', fontSize: 7 },
              { text: bankAccountNumber, color: '#000', fontSize: 7 },
            ],
          },
        ],
        width: '50%',
        columnGap: 0,
      },
    ],
    columnGap: 0,
  };
}
