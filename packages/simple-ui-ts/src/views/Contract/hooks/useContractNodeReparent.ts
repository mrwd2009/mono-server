import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import useContractTree from './useContractTree';
import { useAppDispatch } from '../../../hooks';
import { redrawCurrentContractTree } from '../slices';

const useContractNodeReparent = () => {
  const [{ loading }, request] = useAxios({ url: apiEndpoints.contract.reparentTreeNode, method: 'post' });
  const { loading: treeLoading, fetchContractTree } = useContractTree();
  const dispatch = useAppDispatch();

  const redrawContractTree = useCallback(() => {
    dispatch(redrawCurrentContractTree());
  }, [dispatch]);

  const reparentContractNode = useCallback(
    (data: any) => {
      return request({ data })
        .then((res) => {
          return fetchContractTree(res.data);
        })
        .catch(() => {
          redrawContractTree();
        });
    },
    [request, fetchContractTree, redrawContractTree],
  );

  return {
    loading: loading || treeLoading,
    reparentContractNode,
    redrawContractTree,
  };
};

export default useContractNodeReparent;
