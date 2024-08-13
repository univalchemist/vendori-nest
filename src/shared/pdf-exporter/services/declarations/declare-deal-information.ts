import * as dayjs from 'dayjs';

import { ExportType, PdfData } from '../../types';
import { AddressTypeEnum } from '../../../../oem/main/oem-addresses/oem-address.enums/address-type.enum';
import { PDFImages } from '../../images';
import { declareAddress } from './declare-address';
import { QuoteStatusEnum } from '../../../../oem/main/oem-quotes/oem-quote.enums/quote-status.enum';

export function declareDealInformation(
  exportType: ExportType,
  documentData: PdfData,
) {
  const customer =
    exportType === ExportType.Quote
      ? documentData.quotes[0]?.customer
      : documentData.vendo?.customer;
  if (!customer) {
    return {
      columns: [
        {
          stack: [
            {
              text: 'Sales Invoice To',
              fontSize: 7,
              bold: true,
            },
            {
              text: '---',
              margin: [0, 8, 0, 0],
              fontSize: 8,
              italics: true,
            },
          ],
        },
        {
          stack: [
            {
              text: 'Ship To',
              fontSize: 7,
              bold: true,
            },
            {
              text: '---',
              margin: [0, 8, 0, 0],
              fontSize: 8,
              italics: true,
            },
          ],
        },
        {
          stack: [
            {
              text: 'Bill To',
              fontSize: 7,
              bold: true,
            },
            {
              text: '---',
              margin: [0, 8, 0, 0],
              fontSize: 8,
              italics: true,
            },
          ],
        },
        {
          stack:
            exportType === ExportType.Vendo
              ? getVendoDetails(documentData.vendo)
              : getQuoteDetails(documentData.quotes[0]),
        },
      ],
      fontSize: 7,
      color: '#000',
    };
  }

  const salesStack: any[] = [
    {
      text: 'Sales Invoice To',
      fontSize: 7,
      bold: true,
    },
    {
      columns: [
        customer?.logoUrl && {
          width: 'auto',
          image: PDFImages.CustomerLogo,
          fit: [40, 40],
          margin: [0, 0, 5, 0],
        },
        {
          text: customer?.customerName || 'Customer',
          width: 'auto',
          fontSize: 8,
          italics: true,
        },
      ],
      columnGap: 0,
    },
  ];

  return {
    columns: [
      {
        stack: salesStack,
      },
      {
        stack: getShipOrBillInformation(customer, AddressTypeEnum.BILLING),
      },
      {
        stack: getShipOrBillInformation(customer, AddressTypeEnum.SHIPPING),
      },
      {
        stack:
          exportType === ExportType.Vendo
            ? getVendoDetails(documentData.vendo)
            : getQuoteDetails(documentData.quotes[0]),
      },
    ],
    fontSize: 7,
    color: '#000',
  };
}

function _getCustomerAddress(customer: any, addressType: AddressTypeEnum) {
  const addressWithType = customer.customerAddresses
    .map((customerAddr: any) => customerAddr.address)
    .find((addr: any) => addr.addressType === addressType);
  const firstAddress =
    customer.customerAddresses && customer.customerAddresses[0]?.address;

  return addressWithType || firstAddress;
}

function getShipOrBillInformation(customer: any, addressType: AddressTypeEnum) {
  return [
    {
      text: addressType === AddressTypeEnum.SHIPPING ? 'Ship To' : 'Bill To',
      fontSize: 7,
      bold: true,
    },
    {
      ...declareAddress(_getCustomerAddress(customer, addressType)),
      margin: [0, 8, 0, 0],
      fontSize: 7,
      bold: true,
    },
    {
      text: [customer.phone],
      fontSize: 7,
      margin: [0, 8, 0, 0],
    },
    {
      text: [customer.customerEmail],
      fontSize: 7,
      margin: [0, 3, 0, 0],
      decoration: 'underline',
      decorationStyle: 'solid',
      decorationColor: 'black',
    },
  ];
}

function getQuoteDetails(quote: any) {
  const { expiresAt, quoteUuid, quoteStatus, usersQuotes } = quote;
  const ownerQuoteUser = usersQuotes?.find(
    (quoteUser: any) => quoteUser.isOwner,
  );
  const ownerUser = ownerQuoteUser?.user;
  const ownerName =
    ownerUser?.firstName && `${ownerUser?.firstName} ${ownerUser?.lastName}`;
  const ownerEmail = ownerUser?.ssoLoginEmail || ownerUser?.notificationEmail;

  const stack = [
    {
      text: [{ text: 'ID: ', bold: true }, quoteUuid],
    },
    {
      text: [
        { text: 'Expiration: ', bold: true },
        expiresAt ? dayjs(expiresAt).format('MM/DD/YY') : 'NA',
      ],
    },
    {
      columns: [
        {
          text: [{ text: 'Status: ', bold: true }, ' '],
          width: 'auto',
        },
        {
          text: [
            quoteStatus === QuoteStatusEnum.AUTO_APPROVED
              ? 'Approved'
              : quoteStatus,
          ],
          color: quoteStatus === QuoteStatusEnum.DRAFT ? 'red' : 'black',
          bold: quoteStatus === QuoteStatusEnum.DRAFT,
        },
      ],
    },
  ];

  if (ownerName) {
    stack.push({
      text: [{ text: 'Owner: ', bold: true }, ownerName],
    });
  }

  if (ownerEmail) {
    stack.push({
      text: [
        { text: 'Email: ', bold: true },
        {
          text: ownerEmail,
          decoration: 'underline',
          decorationStyle: 'solid',
          decorationColor: 'black',
        },
      ],
    });
  }

  return [
    {
      text: 'Quote Details',
      fontSize: 7,
      bold: true,
    },
    {
      stack,
      margin: [0, 8, 0, 0],
    },
  ];
}

function getVendoDetails(vendo: any) {
  const { expiresAt, vendoUuid, vendoStatus, vendosUsers } = vendo;
  const ownerVendoUser = vendosUsers?.find(
    (vendoUser: any) => vendoUser.isOwner,
  );
  const ownerUser = ownerVendoUser?.user;
  const ownerName =
    ownerUser?.firstName && `${ownerUser?.firstName} ${ownerUser?.lastName}`;
  const ownerEmail = ownerUser?.ssoLoginEmail || ownerUser?.notificationEmail;

  const stack = [
    {
      text: [
        'Vendo Expiration: ',
        expiresAt ? dayjs(expiresAt).format('MM/DD/YY') : 'NA',
      ],
    },
    {
      text: ['Vendo ID: ', vendoUuid?.trim()],
    },
    {
      text: ['Vendo Status: ', vendoStatus],
    },
  ];

  if (ownerName) {
    stack.push({
      text: ['Vendo Owner: ', ownerName],
    });
  }

  if (ownerEmail) {
    stack.push({
      text: ['Email: ', ownerEmail],
    });
  }

  return [
    {
      text: 'Vendo Details: ',
      bold: true,
    },
    {
      stack,
      margin: [0, 8, 0, 0],
    },
  ];
}
