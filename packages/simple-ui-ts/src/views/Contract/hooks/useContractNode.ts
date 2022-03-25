import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import { useAppDispatch } from '../../../hooks';
import { updateVersionList } from '../slices';

export const useContractNode = () => {
  const [{ loading }, request] = useAxios({ url: apiEndpoints.contract.treeNode });
  const dispatch = useAppDispatch();

  const fetchContractNode = useCallback(
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
    fetchContractNode,
  };
};

export default useContractNode;
