import { useCallback, useState } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../../config/api-endpoints';
import { showSuccess } from '../../../../util';

const useUserForm = () => {
  const [{ loading: addLoading }, addUser] = useAxios({ url: apiEndpoints.system.addUser, method: 'post' });
  const [{ loading: editLoading }, editUser] = useAxios({ url: apiEndpoints.system.editUser, method: 'put' });
  const [{ loading: rolesLoading }, fetchRoles] = useAxios({ url: apiEndpoints.system.availableRoles });

  const [roles, setRoles] = useState<Array<{ id: number; name: number }>>([]);

  const submit = useCallback(
    (data: any, type: string) => {
      if (type === 'add') {
        return addUser({ data }).then(() => {
          showSuccess('Add account successfully.');
        });
      }
      return editUser({ data: { ...data, type } }).then(() => {
        showSuccess('Edit account successfully.');
      });
    },
    [addUser, editUser],
  );

  const getRoles = useCallback(() => {
    fetchRoles().then(({ data }) => {
      setRoles(data);
    });
  }, [fetchRoles]);

  return {
    loading: addLoading || editLoading,
    rolesLoading,
    roles,
    getRoles,
    submit,
  };
};

export default useUserForm;
