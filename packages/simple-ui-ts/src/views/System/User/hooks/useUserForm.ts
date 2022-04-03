import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../../config/api-endpoints';
import { showSuccess } from '../../../../util';

const useUserForm = () => {
  const [{ loading: addLoading }, addUser] = useAxios({ url: apiEndpoints.system.addUser, method: 'post' });
  const [{ loading: editLoading }, editUser] = useAxios({ url: apiEndpoints.system.editUser, method: 'put' });

  const submit = useCallback(
    (data: any, type: string) => {
      if (type === 'add') {
        return addUser({ data }).then(() => {
          showSuccess('Add account successfully.');
        });
      }
      return editUser({ data }).then(() => {
        showSuccess('Edit account successfully.');
      });
    },
    [addUser, editUser],
  );

  return {
    loading: addLoading || editLoading,
    submit,
  };
};

export default useUserForm;
