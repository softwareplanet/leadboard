export const basicCellStyles = {
  height: '32px',
  padding: '6px 8px 6px 8px',
};

export const basicHeader = {
  ...basicCellStyles,
  borderColor: '#b9babb',
};

export const rightAlignHeader = {
  ...basicHeader,
  textAlign: 'right',
};

export const basicColumn = {
  ...basicCellStyles,
};

export const rightAlignColumn = {
  ...basicColumn,
  textAlign: 'right',
};

export const rightAlignStyles = {
  headerStyle: rightAlignHeader,
  style: rightAlignColumn,
};

export const basicColumnStyles = {
  headerStyle: basicHeader,
  style: basicColumn,
};
