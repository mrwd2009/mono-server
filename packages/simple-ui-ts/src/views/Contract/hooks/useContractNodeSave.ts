import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import useContractList from './useContractList';

const useContractNodeSave = () => {
  const [{ loading }, request] = useAxios({ url: apiEndpoints.contract.saveResuableNode, method: 'post' });
  const { loading: listLoading, fetchList } = useContractList();

  const saveContractNode = useCallback(
    (data: any) => {
      return request({ data }).then(() => {
        return fetchList();
      });
    },
    [request, fetchList],
  );

  return {
    loading: loading || listLoading,
    saveContractNode,
  };
};

export default useContractNodeSave;