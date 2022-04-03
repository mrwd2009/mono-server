import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import { showSuccess, showConfirm } from '../../../../util';
import apiEndpoints from '../../../../config/api-endpoints';
import useServerTable from '../../../../components/ServerTable/hooks/useServerTable';

const useUser = () => {
  const {
    table,
    table: { refreshListRef },
  } = useServerTable(() => {
    return {
      table: {
        url: apiEndpoints.system.userList,
        sorter: {
          field: 'created_at',
          order: 'DESC',
        },
      },
    };
  });

  const [{ loading }, deleteUser] = useAxios({ url: apiEndpoints.system.deleteUser, method: 'delete' });

  const refreshTable = useCallback(() => {
    refreshListRef.current?.();
  }, [refreshListRef]);

  const handleDelete = useCallback(
    (id: number) => {
      showConfirm({
        title: 'Delete Account',
        content: 'Are you sure to delete currrent account?',
        onConfirm: () => {
          deleteUser({ params: { id } }).then(() => {
            showSuccess('Delete account successfully.');
            refreshListRef.current?.();
          });
        },
      });
    },
    [refreshListRef, deleteUser],
  );

  return {
    loading,
    table,
    refreshTable,
    handleDelete,
  };
};

export default useUser;
