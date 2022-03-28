import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import useContractTree from './useContractTree';
import useContractList from './useContractList';
import { useAppSelector } from '../../../hooks';
import { selectSelectedId, selectSelectedVersion } from '../slices';

const useInsertInternalNode = () => {
  const [{ loading }, request] = useAxios({ url: apiEndpoints.contract.createNode, method: 'post' });
  const { loading: treeLoading, fetchContractTree } = useContractTree();
  const { loading: listLoading, fetchList } = useContractList();
  const root = useAppSelector(selectSelectedId);
  const version = useAppSelector(selectSelectedVersion);

  const createContractNode = useCallback(
    (data: any) => {
      return request({ data }).then((res) => {
        if (data.type === 'contract') {
          return fetchList().then(() => {
            return fetchContractTree(res.data);
          });
        } else {
          return fetchContractTree({ root: root!, version: version! });
        }
      });
    },
    [request, fetchContractTree, fetchList, root, version],
  );

  return {
    loading: loading || treeLoading || listLoading,
    createContractNode,
  };
};

export default useInsertInternalNode;
