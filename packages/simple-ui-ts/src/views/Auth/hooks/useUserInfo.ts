import { useCallback, useState } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import { updateUserInfo, updateAvatar } from '../slices';
import { useAppDispatch } from '../../../hooks';

const useUserInfo = () => {
  const dipatch = useAppDispatch();
  const [loaded, setLoaded] = useState(false);
  const [{ loading }, request] = useAxios({ url: apiEndpoints.system.info });
  const [{ loading: avatarLoading }, requestAvatar] = useAxios({ url: apiEndpoints.system.avatar });

  const fetchUserInfo = useCallback(() => {
    request().then(({ data: result }) => {
      dipatch(
        updateUserInfo({
          user: result.user,
          username: result.username,
          permissions: result.permissions,
          profileEditable: result.profileEditable,
        }),
      );
      setLoaded(true);
    });
  }, [request, dipatch]);

  const fetchAvatar = useCallback(() => {
    dipatch(
      updateAvatar({
        loading: true,
      }),
    );
    requestAvatar()
      .then(({ data }) => {
        dipatch(
          updateAvatar({
            ...data,
            loading: false,
          }),
        );
      })
      .catch(() => {
        dipatch(
          updateAvatar({
            loading: false,
          }),
        );
      });
  }, [requestAvatar, dipatch]);

  return {
    loaded,
    loading,
    avatarLoading,
    fetchAvatar,
    fetchUserInfo,
  };
};

export default useUserInfo;
