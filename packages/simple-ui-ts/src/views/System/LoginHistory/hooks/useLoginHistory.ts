import apiEndpoints from '../../../../config/api-endpoints';
import useServerTable from '../../../../components/ServerTable/hooks/useServerTable';

const useLoginHistory = () => {
  const { table } = useServerTable(() => {
    return {
      table: {
        url: apiEndpoints.system.userHistoryList,
        sorter: {
          field: 'created_at',
          order: 'DESC',
        },
      },
    };
  });

  return {
    table,
  };
};

export default useLoginHistory;
