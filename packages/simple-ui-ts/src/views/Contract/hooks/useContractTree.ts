import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import { useAppDispatch } from '../../../hooks';
import { updateContractTree, updateSelectedContract, updateSelectedNodeID } from '../slices';

export const useContractTree = () => {
  const [{ loading }, request] = useAxios({ url: apiEndpoints.contract.tree, method: 'post' });
  const dispatch = useAppDispatch();

  const fetchContractTree = useCallback(
    (data: { root: number, version: number }) => {
      return request({ data }).then((res) => {
        dispatch(updateContractTree(res.data));
        dispatch(updateSelectedContract(data));
      });
    },
    [request, dispatch],
  );

  const fetchContractNode = useCallback((node?: any) => {
    dispatch(updateSelectedNodeID(node?.data.id))
  }, [dispatch]);

  return {
    loading,
    fetchContractTree,
    fetchContractNode,
  };
};

export default useContractTree;
