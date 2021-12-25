import Text, * as text from './Text';

test('normalizeTextStyle', () => {
  let raw = {
    align: 'center',
    verticalAlign: 'top',
    padding: [2, 3],
    rich: {
      rich1: {
        align: 'right',
        padding: 3,
        fontStyle: 'italic',
        fontWeight: 500,
        fontSize: 14,
        fontFamily: 'system-ui'
      },
      rich2: {
        verticalAlign: 'bottom',
        padding: [1, 2, 3],
        fontSize: '12px'
      }
    }
  };
  text.normalizeTextStyle(raw as any);
  expect(raw).toEqual({
    align: 'center',
    verticalAlign: 'top',
    padding: [2, 3, 2, 3],
    rich: {
      rich1: {
        align: 'right',
        padding: [3,3,3,3],
        fontStyle: 'italic',
        fontWeight: 500,
        fontSize: 14,
        fontFamily: 'system-ui',
        font: 'italic 500 14px system-ui',
        verticalAlign: undefined,
      },
      rich2: {
        verticalAlign: 'bottom',
        padding: [1, 2, 3, 2],
        fontSize: '12px',
        font: '12px sans-serif',
      }
    }
  });
});