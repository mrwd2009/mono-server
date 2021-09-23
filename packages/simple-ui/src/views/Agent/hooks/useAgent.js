import { useMemo } from 'react';
import mapValues from 'lodash/mapValues';
import api from '../../../config/api';
import useServerTable from '../../../components/ServerTable/hooks/useServerTable';
import { useGlobalSearch } from '../../../context/app';

const useAgent = () => {
  const {
    filter: {
      onSearch,
    },
    table,
  } = useServerTable(() => {
    return {
      table: {
        url: api.agent.list,
      },
    };
  });
  const { isSearching, getSearchHandler } = useGlobalSearch();
  const handleGlobalSearch = useMemo(() => {
    return getSearchHandler({ key: 'agent', onSearch: (values) => {
      onSearch(mapValues(values, val => {
        return [val[0]];
      }));
    }});
  }, [getSearchHandler, onSearch]);

  return {
    table,
    isSearching,
    handleGlobalSearch,
  };
};

export default useAgent;