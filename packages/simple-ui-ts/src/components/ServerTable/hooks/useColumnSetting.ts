import { useState, useCallback, useMemo } from 'react';
import map from 'lodash/map';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import startsWith from 'lodash/startsWith';
import every from 'lodash/every';
import compact from 'lodash/compact';
import isArray from 'lodash/isArray';
import { arrayMove } from '@dnd-kit/sortable';

const toKey = (key: string | string[]) => {
  if (isArray(key)) {
    return key.join('_');
  }
  return `${key}`;
};

const useColumnSetting = (uniqueSavedKey: string, version: string, columns: any) => {
  if (!uniqueSavedKey || !version) {
    throw new Error('Must have a global unique saved key and version to store changes.');
  }
  const [cols, setCols] = useState(() => {
    if (localStorage) {
      let saved = localStorage.getItem(uniqueSavedKey);
      if (saved && startsWith(saved, version)) {
        saved = saved.substring(version.length);
        return compact(
          map(saved.split(','), (item) => {
            const [colKey, visible] = item.split('|');
            const def = find(columns, (col) => {
              return toKey(col.dataIndex) === colKey;
            });
            if (def) {
              return {
                title: def.title,
                key: colKey,
                visible: visible !== '0',
                fixed: !!def.fixed,
                cSwitchable: def.cSwitchable !== false,
              };
            }
            return null;
          }),
        );
      }
    }
    return map(columns, (col) => ({
      title: col.title,
      key: toKey(col.dataIndex),
      visible: true,
      fixed: !!col.fixed,
      cSwitchable: col.cSwitchable !== false,
    }));
  });

  const onColPositionChange = useCallback(
    ({ activeId, overId }: { activeId: string; overId: string }) => {
      if (activeId === overId) {
        return;
      }
      const activeIndex = findIndex(cols, { key: activeId });
      const overIndex = findIndex(cols, { key: overId });
      const newCols = arrayMove(cols, activeIndex, overIndex);
      setCols(newCols);
      if (localStorage) {
        localStorage.setItem(
          uniqueSavedKey,
          `${version}${map(newCols, (col) => `${col.key}|${+col.visible}`).join(',')}`,
        );
      }
    },
    [cols, uniqueSavedKey, version],
  );

  const onColVisibleChange = useCallback(
    ({ id, visible }: { id: string; visible: boolean }) => {
      const index = findIndex(cols, { key: id });
      const newCols = [...cols];
      newCols[index] = {
        ...newCols[index],
        visible,
      };
      setCols(newCols);
      if (localStorage) {
        localStorage.setItem(
          uniqueSavedKey,
          `${version}${map(newCols, (col) => `${col.key}|${+col.visible}`).join(',')}`,
        );
      }
    },
    [cols, uniqueSavedKey, version],
  );

  const onCheckAll = useCallback(
    (checked: boolean) => {
      let newCols = [];
      if (checked) {
        newCols = map(cols, (col) => {
          if (col.fixed || !col.cSwitchable) {
            return col;
          }
          return {
            ...col,
            visible: true,
          };
        });
      } else {
        newCols = map(cols, (col) => {
          if (col.fixed || !col.cSwitchable) {
            return col;
          }
          return {
            ...col,
            visible: false,
          };
        });
      }
      setCols(newCols);
      if (localStorage) {
        localStorage.setItem(
          uniqueSavedKey,
          `${version}${map(newCols, (col) => `${col.key}|${+col.visible}`).join(',')}`,
        );
      }
    },
    [cols, uniqueSavedKey, version],
  );

  const onReset = useCallback(() => {
    const newCols = map(columns, (col) => ({
      title: col.title,
      key: toKey(col.dataIndex),
      visible: true,
      fixed: !!col.fixed,
      cSwitchable: col.cSwitchable !== false,
    }));
    setCols(newCols);
    if (localStorage) {
      localStorage.setItem(
        uniqueSavedKey,
        `${version}${map(newCols, (col) => `${col.key}|${+col.visible}`).join(',')}`,
      );
    }
  }, [columns, uniqueSavedKey, version]);

  const allChecked = useMemo(() => {
    return every(cols, (col) => col.visible || col.fixed || !col.cSwitchable);
  }, [cols]);

  const tableColumns = useMemo(() => {
    return compact(
      map(cols, (col) => {
        if (!col.visible) {
          return null;
        }
        return find(columns, (rawCol) => {
          return toKey(rawCol.dataIndex) === col.key;
        });
      }),
    );
  }, [columns, cols]);

  const setting = useMemo(() => {
    return {
      cols,
      allChecked,
      onColPositionChange,
      onColVisibleChange,
      onCheckAll,
      onReset,
    };
  }, [cols, allChecked, onColPositionChange, onColVisibleChange, onCheckAll, onReset]);

  return {
    tableColumns,
    setting,
  };
};

export default useColumnSetting;
