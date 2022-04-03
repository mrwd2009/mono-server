import { useState, useCallback, useMemo } from 'react';
import forEach from 'lodash/forEach';

export const useFilterPanel = (inputOptions: any) => {
  const [options] = useState(inputOptions);
  const { items } = options || {};
  const defaultValue = useMemo(() => {
    let val: any = {};
    forEach(items, (item: any) => {
      if (item.type === 'number') {
        val[item.field] = item.defaultValue || null;
        return;
      }
      if (item.type === 'daterange') {
        val[item.field] = item.defaultValue || [null, null];
        return;
      }
      if (item.type === 'select') {
        val[item.field] = item.defaultValue || null;
        return;
      }
      val[item.field] = item.defaultValue || '';
    });
    return val;
  }, [items]);
  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback((val) => {
    setValue(val);
  }, []);

  const handleSearch = useCallback((val) => {
    setValue(val);
  }, []);

  const handleReset = useCallback((val) => {
    setValue(val);
  }, []);

  return {
    items,
    defaultValue,
    value,
    onChange: handleChange,
    onSearch: handleSearch,
    onReset: handleReset,
  };
};

export default useFilterPanel;
