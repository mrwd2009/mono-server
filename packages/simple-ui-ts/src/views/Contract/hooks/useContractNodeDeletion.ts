import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import useContractTree from './useContractTree';
import { showConfirm } from '../../../util/common';

const useContractNodeDeletion = () => {
  const [{ loading }, request] = useAxios({ url: apiEndpoints.contract.deleteNode, method: 'delete' });
  const { loading: treeLoading, fetchContractTree } = useContractTree();

  const deleteContractNode = useCallback(
    (node: number, root: number, version: number) => {
      showConfirm({
        title: 'Delete',
        content: 'Are you sure to delete current node?',
        onConfirm: () => {
          request({ params: { node }}).then(() => {
            fetchContractTree({ root, version });
          });
        },
      });
    },
    [request, fetchContractTree],
  );

  return {
    loading: loading || treeLoading,
    deleteContractNode,
  };
};

export default useContractNodeDeletion;