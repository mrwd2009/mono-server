import { useCallback, useMemo, useState } from 'react';
import mapValues from 'lodash/mapValues';
import api from '../../../config/api';
import useServerTable from '../../../components/ServerTable/hooks/useServerTable';
import { useGlobalSearch } from '../../../context/app';

const useService = () => {
  const {
    filter: {
      onSearch,
    },
    table,
  } = useServerTable(() => {
    return {
      table: {
        url: api.service.list,
      },
    };
  });
  const { isSearching, getSearchHandler } = useGlobalSearch();
  const handleGlobalSearch = useMemo(() => {
    return getSearchHandler({ key: 'service', onSearch: (values) => {
      onSearch(mapValues(values, val => {
        return [val[0]];
      }));
    }});
  }, [getSearchHandler, onSearch]);

  const [assign, setAssign] = useState(null);
  const openAssign = useCallback((service_id) => {
    setAssign({ service_id });
  }, []);

  return {
    table,
    assign,
    openAssign,
    isSearching,
    handleGlobalSearch,
  };
};

export default useService;