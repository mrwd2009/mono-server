import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import useContractTree from './useContractTree';
import useContractList from './useContractList';

const useInsertInternalNode = () => {
  const [{ loading }, request] = useAxios({ url: apiEndpoints.contract.createNode, method: 'post' });
  const { loading: treeLoading, fetchContractTree } = useContractTree();
  const { loading: listLoading, fetchList } = useContractList();

  const createContractNode = useCallback(
    (data: any, root: number, version: number) => {
      return request({ data }).then((res) => {
        if (data.type === 'contract') {
          return fetchList()
            .then(() => {
              return fetchContractTree(res.data);
            })
        } else {
          return fetchContractTree({ root, version });
        }
      });
    },
    [request, fetchContractTree, fetchList],
  );

  return {
    loading: loading || treeLoading || listLoading,
    createContractNode,
  };
};

export default useInsertInternalNode;