import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import { useAppDispatch } from '../../../hooks';
import { updateContractNodeProps, updateContractTreeNodeName } from '../slices';

const useContractNodeBasic = () => {
  const [{ loading }, request] = useAxios({ url: apiEndpoints.contract.updateNodeBasic, method: 'put' });
  const dispatch = useAppDispatch();

  const updateContractNode = useCallback(
    (node: number, field: string, value: string | number | boolean) => {
      return request({ data: { node, field, value }}).then((res) => {
        dispatch(updateContractTreeNodeName({ node, name: (value as string) }));
        dispatch(updateContractNodeProps({ [field]: value }));
      });
    },
    [request, dispatch],
  );

  return {
    loading,
    updateContractNode,
  };
};

export default useContractNodeBasic;