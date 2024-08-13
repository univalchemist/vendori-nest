export function declareComment(commentText: string, size: 'sm' | 'lg' = 'lg') {
  return {
    layout: {
      vLineWidth: () => 0,
      hLineColor: () => '#fff',
      paddingLeft: () => 0,
      paddingRight: () => 0,
    },
    table: {
      widths: ['*'],
      body: [
        [
          {
            text: commentText,
            fillOpacity: 0.7,
            fontSize: size === 'lg' ? 7 : 6,
          },
        ],
      ],
    },
    color: '#000',
  };
}
