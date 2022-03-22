import { useCallback } from 'react';
import useAxios from 'axios-hooks';
import apiEndpoints from '../../../config/api-endpoints';
import { useAppDispatch } from '../../../hooks';
import { updateContractList } from '../slices';

const useContractList = () => {
  const [{ loading: listLoading }, requestList ] = useAxios({ url: apiEndpoints.contract.list });
  const [{ loading: savedLoading }, requestSaved ] = useAxios({ url: apiEndpoints.contract.savedNodes });
  const dispatch = useAppDispatch();

  const fetchList = useCallback(() => {
    Promise.all([requestList(), requestSaved()])
      .then((resList) => {
        dispatch(updateContractList({
          contractList: resList[0].data,
          savedList: resList[1].data,
        }));
      })
  }, [requestList, requestSaved, dispatch]);

  return {
    loading: listLoading || savedLoading,
    fetchList,
  };
};

export default useContractList;
