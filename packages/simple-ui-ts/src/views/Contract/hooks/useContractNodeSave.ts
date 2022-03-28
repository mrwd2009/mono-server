import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import useContractList from './useContractList';
import { useAppSelector } from '../../../hooks';
import { selectSelectedNodeID } from '../slices';

const useContractNodeSave = () => {
  const [{ loading }, request] = useAxios({ url: apiEndpoints.contract.saveResuableNode, method: 'post' });
  const { loading: listLoading, fetchList } = useContractList();
  const node = useAppSelector(selectSelectedNodeID);

  const saveContractNode = useCallback(
    (data: any) => {
      return request({ data: { node, type: data.type, name: data.name } }).then(() => {
        return fetchList();
      });
    },
    [request, fetchList, node],
  );

  return {
    loading: loading || listLoading,
    saveContractNode,
  };
};

export default useContractNodeSave;
