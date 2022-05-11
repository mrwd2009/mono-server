import { useCallback, useState } from 'react';
import apiEndpoints from '../../../../config/api-endpoints';
import useServerTable from '../../../../components/ServerTable/hooks/useServerTable';

const useOAuth2User = () => {
  const {
    table,
    table: { refreshListRef },
  } = useServerTable(() => {
    return {
      table: {
        url: apiEndpoints.system.oauth2UserList,
        sorter: {
          field: 'created_at',
          order: 'DESC',
        },
      },
    };
  });

  const [selectedKeys, setSelectedKeys] = useState<number[]>([]);

  const refreshTable = useCallback(() => {
    setSelectedKeys([]);
    refreshListRef.current?.();
  }, [refreshListRef]);

  return {
    table,
    selectedKeys,
    setSelectedKeys,
    refreshTable,
  };
};

export default useOAuth2User;
