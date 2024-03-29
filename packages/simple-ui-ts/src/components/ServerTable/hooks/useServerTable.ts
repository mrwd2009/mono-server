import { useState, useCallback, useRef, useEffect } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import forEach from 'lodash/forEach';
import isArray from 'lodash/isArray';
import identity from 'lodash/identity';
import includes from 'lodash/includes';
import merge from 'lodash/merge';
import axios from 'axios';
import { useMounted } from '../../../hooks/useMounted';
import { useFilterPanel } from '../../FilterPanel/hooks/useFilterPanel';

interface PostParams {
  pagination: {
    current: number;
    pageSize: number;
  };
  filter?: any;
  sorter?: {
    field: string;
    order: 'ASC' | 'DESC';
  };
}

export interface ServerTableOption {
  table: {
    url: string;
    pageSize?: number;
    sorter?: {
      field: string;
      order: 'ASC' | 'DESC';
    };
    stripFilterArray?: boolean;
    beforeRequest?: (data: PostParams) => any | false;
    afterRequest?: (data: any) => { total: number; list: Array<any> };
  };
  [key: string]: any;
}

type RefreshListFunc = (data?: { keepPage?: boolean; background?: boolean; search?: any }) => void;

// If inputOptions is a heavy computation, please send a function
export const useServerTable = (inputOptions: () => ServerTableOption) => {
  const [options] = useState(inputOptions);
  const { filter: filterOption, table: tableOption } = options;
  const { pageSize: initPageSize = 10, sorter: initialSorter = {} } = tableOption || {};
  const { onSearch: onFilterSearch, onReset: onFilterReset, ...restFilter } = useFilterPanel(filterOption);
  const [search, setSearch] = useState({});
  const [pageSize, setPageSize] = useState(initPageSize);
  const [sorter, setSorter] = useState(() => {
    const order = (initialSorter as any).order && (initialSorter as any).order.toLowerCase();
    if (order && includes(['desc', 'asc'], order)) {
      return {
        ...initialSorter,
        order: (initialSorter as any).order === 'asc' ? 'ascend' : 'descend',
      };
    }
    return initialSorter;
  });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rawPostData, setRawPostData] = useState(null);
  const [postData, setPostData] = useState(null);
  const isMounted = useMounted();
  const cancelTokenRef = useRef<any>();
  // used by auto refresh or first time fetching, avoid update while using fetchList method
  const refreshListRef = useRef<RefreshListFunc>();
  const [_fetchList] = useState(() => {
    return ({ currentSearch, currentSorter, currentPage, currentPageSize, background = false }: any) => {
      const {
        url,
        method = 'post',
        stripFilterArray = false,
        beforeRequest = identity,
        afterRequest = identity,
      } = (tableOption || {}) as any;
      let postParams: any = {
        pagination: {
          current: currentPage,
          pageSize: currentPageSize,
        },
      };

      let copiedFilter: any;
      forEach(currentSearch, (val, key) => {
        if (val == null) {
          return;
        }
        if (val === '') {
          return;
        }
        if (isArray(val) && !val.length) {
          return;
        }
        if (!postParams.filter) {
          postParams.filter = {};
        }
        if (!copiedFilter) {
          copiedFilter = {};
        }
        postParams.filter[key] = val;
        copiedFilter[key] = val;
        if (isArray(val) && val.length === 1 && stripFilterArray) {
          copiedFilter[key] = val[0];
        }
      });
      if (currentSorter.order) {
        postParams.sorter = {
          field: currentSorter.field,
          order: currentSorter.order === 'ascend' ? 'ASC' : 'DESC',
        };
      }
      let data = merge({}, postParams, { filter: copiedFilter });
      data = beforeRequest(data);

      if (data === false) {
        // cancel request
        return;
      }
      if (background) {
        // request is processing
        if (cancelTokenRef.current) {
          return;
        }
      } else {
        setLoading(true);
      }
      if (cancelTokenRef.current) {
        // cancel previous request
        cancelTokenRef.current.cancel();
      }
      cancelTokenRef.current = axios.CancelToken.source();
      // store internal post data for internal usage like table header filter.
      setRawPostData(postParams);
      setPostData(data);
      axios({
        url,
        method,
        data: background ? { ...data, _refresh: true } : data,
        cancelToken: cancelTokenRef.current.token,
      })
        .then((data) => {
          if (isMounted.current) {
            unstable_batchedUpdates(() => {
              cancelTokenRef.current = null;
              if (!background) {
                setLoading(false);
              }
              const { total, list } = afterRequest(data) as any;
              const finalPage = Math.floor(total / currentPageSize) + 1;
              if (currentPage > finalPage) {
                // page is not matched, refresh table again
                _fetchList({
                  currentSearch,
                  currentSorter,
                  currentPage: finalPage,
                  currentPageSize,
                  background,
                });
                return;
              }
              setSearch(currentSearch);
              setSorter(currentSorter);
              setPage(currentPage);
              setPageSize(currentPageSize);
              setTotal(total);
              setList(list);
            });
          }
        })
        .catch(() => {
          if (isMounted.current) {
            unstable_batchedUpdates(() => {
              if (!background) {
                setLoading(false);
              }
              cancelTokenRef.current = null;
            });
          }
        });
    };
  });

  // cancel pending request after component is destroyed
  useEffect(() => {
    return () => {
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel();
        cancelTokenRef.current = null;
      }
    };
  }, []);

  const fetchList = useCallback(
    (params) => {
      let {
        search: currentSearch = search,
        sorter: currentSorter = sorter,
        page: currentPage = page,
        keepPage = false,
        pageSize: currentPageSize,
        ...rest
      } = params || {};

      // don't change page according to page size changing
      // this is used to restore table state.
      if (!keepPage) {
        if (currentPageSize) {
          // page size has changed
          if (currentPageSize !== pageSize) {
            currentPage = 1;
          }
        } else {
          currentPageSize = pageSize;
        }
      }

      _fetchList({ currentSearch, currentSorter, currentPage, currentPageSize, ...rest });
    },
    [search, sorter, page, pageSize, _fetchList],
  );
  refreshListRef.current = fetchList;

  const handleTableChange = useCallback(
    (pagination, filter, currentSorter, { action }) => {
      let { current, pageSize: _pageSize } = pagination;
      // reset page after user click sorting icon
      if (action !== 'paginate') {
        current = 1;
      }

      let searchParams = { sorter: currentSorter, page: current, pageSize: _pageSize };
      // store table header filter
      if (action === 'filter') {
        const search = {
          ...((rawPostData && (rawPostData as any).filter) as any), // perhpas has extra filter field outside table header filter
          ...filter,
        };
        onFilterSearch(search);
        (searchParams as any).search = search;
      }
      (refreshListRef as any).current?.(searchParams);
    },
    [onFilterSearch, rawPostData],
  );

  const handleSearch = useCallback(
    (values) => {
      onFilterSearch(values);
      (refreshListRef as any).current?.({ search: values, page: 1 });
    },
    [onFilterSearch],
  );

  const handleReset = useCallback(
    (values) => {
      onFilterReset(values);
      (refreshListRef as any).current?.({ search: values, page: 1 });
    },
    [onFilterReset],
  );

  return {
    filter: {
      loading,
      onSearch: handleSearch,
      onReset: handleReset,
      ...restFilter,
    },
    table: {
      rawPostData,
      postData,
      search,
      sorter,
      page,
      pageSize,
      total,
      list,
      loading,
      refreshListRef,
      onChange: handleTableChange,
      fetchList,
    },
  };
};

export default useServerTable;
