import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import { showConfirm } from '../../../util/common';
import useContractList from './useContractList';
import useContractTree from './useContractTree';
import { useAppSelector } from '../../../hooks';
import { selectSelectedId } from '../slices';

const useContractDeletion = () => {
  const [{ loading }, request] = useAxios({ url: apiEndpoints.contract.deleteTree, method: 'delete' });
  const { loading: listLoading, fetchList } = useContractList();
  const { clearContractTree } = useContractTree();
  const root = useAppSelector(selectSelectedId);

  const deleteContract = useCallback(() => {
    showConfirm({
      title: 'Delete',
      content: 'Are you sure to delete current interim contract?',
      onConfirm: () => {
        request({ params: { root } })
          .then(() => {
            return fetchList();
          })
          .then(() => {
            clearContractTree();
          });
      },
    });
  }, [request, fetchList, clearContractTree, root]);

  return {
    loading: loading || listLoading,
    deleteContract,
  };
};

export default useContractDeletion;
