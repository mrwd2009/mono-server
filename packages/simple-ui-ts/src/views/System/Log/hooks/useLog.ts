import apiEndpoints from '../../../../config/api-endpoints';
import useServerTable from '../../../../components/ServerTable/hooks/useServerTable';

const useLog = () => {
  const { table } = useServerTable(() => {
    return {
      table: {
        url: apiEndpoints.system.log,
        stripFilterArray: true,
        sorter: {
          field: 'timestamp',
          order: 'DESC',
        },
      },
    };
  });

  return {
    table,
  };
};

export default useLog;
