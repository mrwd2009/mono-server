import { useCallback, useState } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../../config/api-endpoints';
import useUserInfo from '../../../Auth/hooks/useUserInfo';
import { showError } from '../../../../util';

const useUserProfile = () => {
  const { fetchAvatar } = useUserInfo();
  const [loading, setLoading] = useState(false);
  const [{ loading: saveLoading }, save] = useAxios({ url: apiEndpoints.system.userProfile, method: 'PUT' });
  const saveProfile = useCallback(
    async (values) => {
      let { displayName, photo } = values;
      setLoading(true);
      try {
        if (photo) {
          if (photo.size / 1024 > 256) {
            showError("The photo size can't larger than 256KB.");
            return;
          }
          photo = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(photo);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
          });
        }
        await save({
          data: {
            displayName,
            photo,
          },
        });
        fetchAvatar();
      } finally {
        setLoading(false);
      }
    },
    [save, fetchAvatar],
  );

  return {
    loading: loading || saveLoading,
    saveProfile,
  };
};

export default useUserProfile;
