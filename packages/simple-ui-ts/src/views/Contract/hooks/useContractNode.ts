import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import { useAppDispatch } from '../../../hooks';
import { updateContractNode, updateSelectedNodeID } from '../slices';

export const useContractNode = () => {
  const [{ loading }, request] = useAxios({ url: apiEndpoints.contract.treeNode });
  const dispatch = useAppDispatch();

  const fetchContractNode = useCallback(
    (node: number) => {
      if (!node) {
        dispatch(updateSelectedNodeID(null));
        dispatch(updateContractNode(null));
        return;
      }
      return request({ params: { node } }).then((res) => {
        dispatch(updateSelectedNodeID(node));
        dispatch(updateContractNode(res.data));
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
