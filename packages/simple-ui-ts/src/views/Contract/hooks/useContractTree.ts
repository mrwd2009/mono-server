import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import { useAppDispatch } from '../../../hooks';
import { updateContractTree, updateSelectedContract, updateContractNode, clearCurrentTree } from '../slices';
import useContractNode from './useContractNode';

export const useContractTree = () => {
  const [{ loading }, request] = useAxios({ url: apiEndpoints.contract.tree, method: 'post' });
  const dispatch = useAppDispatch();

  const fetchContractTree = useCallback(
    (data: { root: number; version: number }) => {
      return request({ data }).then((res) => {
        dispatch(updateSelectedContract(data));
        dispatch(updateContractTree(res.data));
        dispatch(updateContractNode(null));
      });
    },
    [request, dispatch],
  );
  const { loading: nodeLoading, fetchContractNode } = useContractNode();

  const clearContractTree = useCallback(() => {
    dispatch(clearCurrentTree());
  }, [dispatch]);

  return {
    loading: loading || nodeLoading,
    fetchContractTree,
    fetchContractNode,
    clearContractTree,
  };
};

export default useContractTree;
