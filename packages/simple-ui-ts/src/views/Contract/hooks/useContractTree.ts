import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import { useAppDispatch } from '../../../hooks';
import { updateContractTree, updateSelectedContract } from '../slices';

export const useContractTree = () => {
  const [{ loading }, request] = useAxios({ url: apiEndpoints.contract.tree, method: 'post' });
  const dispatch = useAppDispatch();

  const fetchContractTree = useCallback(
    (data: { root: number, version: number }) => {
      return request({ data }).then((res) => {
        dispatch(updateContractTree({ tree: res.data }));
        dispatch(updateSelectedContract(data));
      });
    },
    [request, dispatch],
  );

  return {
    loading,
    fetchContractTree,
  };
};

export default useContractTree;
