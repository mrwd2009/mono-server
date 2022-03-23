import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import { useAppDispatch } from '../../../hooks';
import { updateContractTree, clearContractTree } from '../slices';
import { version } from 'os';

export const useContractVersionList = () => {
  const [{ loading }, request ] = useAxios({ url: apiEndpoints.contract.treeVersionList });
  const dispatch = useAppDispatch();

  const fetchContractVersionList = useCallback((root: number) => {
    return request({ params: { root } })
      .then((res) => {
        dispatch(updateContractTree({ versionList: res.data }));
      });
  }, [request, dispatch]);

  return {
    loading,
    fetchContractVersionList,
  };
};

export const useContractTree = () => {
  const [{ loading }, request ] = useAxios({ url: apiEndpoints.contract.tree, method: 'post' });
  const dispatch = useAppDispatch();

  const fetchContractTree = useCallback((data) => {
    return request({ data })
      .then((res) => {
        dispatch(updateContractTree({ tree: res.data }));
      });
  }, [request, dispatch]);

  const {
    loading: vLoading,
    fetchContractVersionList
  } = useContractVersionList();

  const loadSavedContract = useCallback((saved: { root: number, version: number } | null) => {
    if (!saved) {
      dispatch(clearContractTree());
    } else {
      fetchContractVersionList(saved.root)
        .then(() => {
          // todo check valid version
          dispatch(updateContractTree({ selectedVersion: saved.version }));
          return fetchContractTree(saved);
        });
    }
  }, [fetchContractVersionList, fetchContractTree, dispatch])

  return {
    loading: loading || vLoading,
    fetchContractTree,
    loadSavedContract,
  };
};

export default useContractTree;
