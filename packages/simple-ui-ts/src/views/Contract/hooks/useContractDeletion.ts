import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import { showConfirm } from '../../../util/common';
import useContractList from './useContractList';
import useContractTree from './useContractTree';

const useContractDeletion = () => {
  const [{ loading }, request] = useAxios({ url: apiEndpoints.contract.deleteTree, method: 'delete' });
  const { loading: listLoading, fetchList } = useContractList();
  const { clearContractTree } = useContractTree();

  const deleteContract = useCallback(
    (root: number) => {
      showConfirm({
        title: 'Delete',
        content: 'Are you sure to delete current interim contract?',
        onConfirm: () => {
          request({ params: { root }}).then(() => {
            return fetchList();
          })
            .then(() => {
              clearContractTree();
            });
        },
      });
    },
    [request, fetchList, clearContractTree],
  );

  return {
    loading: loading || listLoading,
    deleteContract,
  };
};

export default useContractDeletion;