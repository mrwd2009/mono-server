import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import some from 'lodash/some';
import apiEndpoints from '../../../config/api-endpoints';
import { useAppDispatch } from '../../../hooks';
import { updateContractTree, clearContractTree } from '../slices';
import util from '../../../util';

export const useContractVersionList = () => {
  const [{ loading }, request ] = useAxios({ url: apiEndpoints.contract.treeVersionList });
  const dispatch = useAppDispatch();

  const fetchContractVersionList = useCallback((root: number) => {
    return request({ params: { root } })
      .then((res) => {
        dispatch(updateContractTree({ versionList: res.data }));
        return res.data;
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
      dispatch(updateContractTree({ selectedVersion: null }));
      fetchContractVersionList(saved.root)
        .then((list) => {
          if (some(list, item => item.version === saved.version)) {
            dispatch(updateContractTree({ selectedVersion: saved.version }));
          }
        });
    }
  }, [fetchContractVersionList, dispatch]);

  const selectVersion  = useCallback((version) => {
    dispatch(updateContractTree({ selectedVersion: version }));
  }, [dispatch]);

  return {
    loading: loading || vLoading,
    fetchContractTree,
    loadSavedContract,
    selectVersion,
  };
};

export default useContractTree;
