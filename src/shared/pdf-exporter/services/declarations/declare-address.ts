export function declareAddress(address: any) {
  const result = {
    stack: [],
  };

  if (!address) {
    return result;
  }

  const { address_1, address_2, address_3, city, zipCode, region } = address;

  let _address = address_1 || address_2 || address_3 || '-';
  _address = _address === 'null' || _address === 'undefined' ? '-' : address;

  result.stack.push({
    text: _address,
    margin: [0, 0, 0, 2],
  });

  if (region && region !== 'null' && region !== 'undefined') {
    result.stack.push({
      text: `${city}, ${region} ${zipCode}`,
      margin: [0, 0, 0, 2],
    });
  }

  return result;
}
