import { useCallback, useState } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../../config/api-endpoints';
import { showSuccess } from '../../../../util';

const useOAuth2UserForm = () => {
  const [{ loading: editLoading }, editUser] = useAxios({ url: apiEndpoints.system.editOAuth2User, method: 'put' });
  const [{ loading: rolesLoading }, fetchRoles] = useAxios({ url: apiEndpoints.system.availableRoles });

  const [roles, setRoles] = useState<Array<{ id: number; name: number }>>([]);

  const submit = useCallback(
    (data: any, type: string) => {
      return editUser({ data: { ...data, type } }).then(() => {
        showSuccess('Edit account successfully.');
      });
    },
    [editUser],
  );

  const getRoles = useCallback(() => {
    fetchRoles().then(({ data }) => {
      setRoles(data);
    });
  }, [fetchRoles]);

  return {
    loading: editLoading,
    rolesLoading,
    roles,
    getRoles,
    submit,
  };
};

export default useOAuth2UserForm;
