import { CompanyColorsType } from '../../types';

export function declareUsersQuote(
  usersQuote: any[],
  colors: CompanyColorsType,
  size: 'sm' | 'lg' = 'lg',
) {
  const defaultSpaceBetweenRows = size === 'lg' ? 10 : 5;
  const result = {
    layout: {
      vLineWidth: () => 0,
      hLineWidth: (rowIndex: number) =>
        rowIndex === 0 || rowIndex === 1 ? 0 : defaultSpaceBetweenRows,
      hLineColor: () => '#fff',
      paddingTop: () => 0,
      paddingBottom: () => 0,
      paddingLeft: () => 0,
      paddingRight: () => 0,
    },
    table: {
      dontBreakRows: true,
      keepWithHeaderRows: true,
      headerRows: 1,
      widths:
        size === 'lg'
          ? [141, 10, 141, 10, 141, 10, 141, 0]
          : [111, 10, 111, 10, 111, 10, 111, 10, 112, 0],
      body: [
        // For default PDF export we have 4 quote users per row, for a small PDF export we have 5 contacts per row
        ...getRows(usersQuote, colors, size),
      ],
    },
  };

  return result;
}

function getRows(
  usersQuote: any[],
  colors: CompanyColorsType,
  size: 'sm' | 'lg' = 'lg',
) {
  const table = [];

  for (let i = 0; i < usersQuote.length; ++i) {
    const userQuote = usersQuote[i];

    if (size === 'lg' && i % 4 === 0) {
      table.push([]);
    } else if (size === 'sm' && i % 5 === 0) {
      table.push([]);
    }

    table[table.length - 1].push(createUserQuoteCell(userQuote, colors, size));
    table[table.length - 1].push('');
  }

  const columnsInTable = size === 'lg' ? 8 : 10;

  if (table[table.length - 1].length < columnsInTable) {
    const diff = columnsInTable - table[table.length - 1].length;

    for (let i = 0; i < diff; ++i) {
      table[table.length - 1].push('');
    }
  }

  return table;
}

function createUserQuoteCell(
  userQuote: any,
  colors: CompanyColorsType,
  size: 'sm' | 'lg' = 'lg',
) {
  const result = {
    stack: [],
    style: size === 'lg' ? 'contactCard' : 'contactCardSmall',
  };
  const fontSize = size === 'lg' ? 7 : 6;

  if (userQuote.user.firstName || userQuote.user.lastName)
    result.stack.push({
      text: userQuote.user.firstName + ' ' + userQuote.user.lastName,
      margin: size === 'lg' ? [0, 0, 0, 8] : [0, 0, 0, 4],
      bold: true,
      fontSize,
    });

  if (userQuote.user?.company?.companyName)
    result.stack.push({
      text: `${userQuote.user.company.companyName}, ${userQuote.type}`,
      fontSize,
      margin: [0, 0, 0, 3],
    });

  if (userQuote.user.phone)
    result.stack.push({
      text: userQuote.user.phone,
      fontSize,
      margin: [0, 0, 0, 3],
    });

  if (userQuote.user.notificationEmail)
    result.stack.push({
      text: userQuote.user.notificationEmail,
      fontSize,
      decoration: 'underline',
      decorationStyle: 'solid',
      decorationColor: 'black',
    });

  return result;
}
