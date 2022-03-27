import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import useContractTree from './useContractTree';
import { showConfirm } from '../../../util/common';
import { useAppSelector } from '../../../hooks';
import { selectSelectedId, selectSelectedNodeID, selectSelectedVersion } from '../slices';

const useContractNodeDeletion = () => {
  const [{ loading }, request] = useAxios({ url: apiEndpoints.contract.deleteNode, method: 'delete' });
  const { loading: treeLoading, fetchContractTree } = useContractTree();
  const root = useAppSelector(selectSelectedId);
  const node = useAppSelector(selectSelectedNodeID);
  const version = useAppSelector(selectSelectedVersion);

  const deleteContractNode = useCallback(
    () => {
      showConfirm({
        title: 'Delete',
        content: 'Are you sure to delete current node?',
        onConfirm: () => {
          request({ params: { node }}).then(() => {
            fetchContractTree({ root: root!, version: version! });
          });
        },
      });
    },
    [request, fetchContractTree, node, root, version],
  );

  return {
    loading: loading || treeLoading,
    deleteContractNode,
  };
};

export default useContractNodeDeletion;