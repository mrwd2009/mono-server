import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import { useAppDispatch } from '../../../hooks';
import { updateVersionList } from '../slices';

export const useContractVersionList = () => {
  const [{ loading }, request] = useAxios({ url: apiEndpoints.contract.treeVersionList });
  const dispatch = useAppDispatch();

  const fetchContractVersionList = useCallback(
    (root: number) => {
      return request({ params: { root } }).then((res) => {
        dispatch(updateVersionList(res.data));
        return res.data;
      });
    },
    [request, dispatch],
  );

  return {
    loading,
    fetchContractVersionList,
  };
};

export default useContractVersionList;
