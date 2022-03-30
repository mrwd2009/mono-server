import { useCallback } from 'react';
import { useMergedState } from '../../../../hooks';

const useDashboard = () => {
  const [state, setState] = useMergedState({
    loading: false,
    type: null,
    fixedDay: null,
    dayRange: null,
    statistic: null,
  });
  // const isMounted = useMounted();

  const fetchStatistic = useCallback(
    ({ type, fixedDay, dayRange }: any) => {
      setState({
        type,
        fixedDay,
        dayRange,
        statistic: {
          exception: 3,
          warning: 5,
          resolved: 6,
          open: 3,
          perDay: {
            days: ['2021-03-01', '2021-03-02'],
            exception: [4, 5],
            warning: [1, 3],
            resolved: [3, 4],
            open: [5, 6],
          },
          perType: {
            level: [
              { value: 2, name: 'High' },
              { value: 2, name: 'Low' },
            ],
            type: [
              { value: 4, name: 'Data' },
              { value: 2, name: 'Network' },
            ],
          },
        },
      });
    },
    [setState],
  );

  return {
    ...state,
    fetchStatistic,
  };
};

export default useDashboard;
