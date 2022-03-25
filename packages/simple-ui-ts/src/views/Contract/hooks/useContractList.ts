import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import some from 'lodash/some';
import apiEndpoints from '../../../config/api-endpoints';
import { useAppDispatch } from '../../../hooks';
import useContractVersionList from './useContractVersionList';
import useContractTree from './useContractTree';
import { updateContractList, clearCurrentTree, updateSelectedContract } from '../slices';
import util from '../../../util';

const useContractList = () => {
  const [{ loading: listLoading }, requestList] = useAxios({ url: apiEndpoints.contract.list });
  const [{ loading: savedLoading }, requestSaved] = useAxios({ url: apiEndpoints.contract.savedNodes });
  const dispatch = useAppDispatch();

  const fetchList = useCallback(() => {
    Promise.all([requestList(), requestSaved()]).then((resList) => {
      dispatch(
        updateContractList({
          contractList: resList[0].data,
          savedList: resList[1].data,
        }),
      );
    });
  }, [requestList, requestSaved, dispatch]);

  const { loading: vLoading, fetchContractVersionList } = useContractVersionList();
  const { loading: tLoading, fetchContractTree } = useContractTree();

  const loadSavedContract = useCallback(
    (saved: { root: number; version: number } | null) => {
      if (!saved) {
        dispatch(clearCurrentTree());
        dispatch(updateSelectedContract(null));
      } else {
        fetchContractVersionList(saved.root).then((list) => {
          if (some(list, (item) => item.version === saved.version)) {
            fetchContractTree(saved);
          } else {
            util.showError('Invalid contract version.', 'contract');
          }
        });
      }
    },
    [fetchContractVersionList, fetchContractTree,  dispatch],
  );

  return {
    loading: listLoading || savedLoading || vLoading || tLoading,
    fetchList,
    loadSavedContract,
  };
};

export default useContractList;
