import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { updateContractNodeProps, updateContractTreeNodeName, selectContractNode, updateSelectedContractName } from '../slices';

const useContractNodeBasic = () => {
  const [{ loading }, request] = useAxios({ url: apiEndpoints.contract.updateNodeBasic, method: 'put' });
  const dispatch = useAppDispatch();
  const nodeInfo = useAppSelector(selectContractNode);

  const isRootNode = nodeInfo?.isRootNode;

  const updateContractNode = useCallback(
    (node: number, field: string, value: string | number | boolean) => {
      return request({ data: { node, field, value }}).then(() => {
        if (field === 'Name') {
          dispatch(updateContractTreeNodeName({ node, name: (value as string) }));
          if (isRootNode) {
            dispatch(updateSelectedContractName(value as string))
          }
        }
        dispatch(updateContractNodeProps({ [field]: value }));
      });
    },
    [request, dispatch, isRootNode],
  );

  return {
    loading,
    updateContractNode,
  };
};

export default useContractNodeBasic;