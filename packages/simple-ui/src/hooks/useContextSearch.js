import { useMemo } from 'react';
import map from 'lodash/map';
import flatten from 'lodash/flatten';
import filter from 'lodash/filter';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import trim from 'lodash/trim';
import maxBy from 'lodash/maxBy';
import orderBy from 'lodash/orderBy';
import uniq from 'lodash/uniq';
import { showError } from '../utils/common';

const getDefaultOptions = (defs) => {
  let list = map(defs, (item) => {
    if (item.fixed) {
      return map(item.list, (fixedItem) => ({
        fixed: true,
        label: fixedItem.label,
      }));
    }
    return {
      fixed: false,
      label: item.label,
    };
  });
  return flatten(list);
};

// Compute the edit distance between the two given strings
const getEditDistance = (a, b) => {
  if (a.length === 0) return b.length; 
  if (b.length === 0) return a.length;

  let matrix = [];

  // increment along the first column of each row
  let i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  let j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i-1) === a.charAt(j-1)) {
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};

const matchedRatio = (a, b) => {
  return (a.length + b.length - getEditDistance(a.toLowerCase(), b.toLowerCase())) / (a.length + b.length);
};

const getMostMached = (list, search, returnList = false) => {
  let matched = [];
  let ratio = 0;
  const lowS = search.toLowerCase();
  let lowT = '';
  let included = false;
  forEach(list, (item) => {
    lowT = item.toLowerCase();
    if (lowS.includes(lowT)) {
      included = true;
      matched.push({
        label: item,
        ratio: lowT.length / lowS.length,
      });
    }
    if (lowT.includes(lowS) && lowT !== lowS) {
      included = true;
      matched.push({
        label: item,
        ratio: lowS.length / lowT.length,
      });
    }
    if (!included) {
      ratio = matchedRatio(item, search);
      if (ratio > 0.65) {
        matched.push({
          label: item,
          ratio,
        });
      }
    }
  });
  if (returnList) {
    return orderBy(matched, ['ratio'], ['desc']);
  } else {
    return maxBy(matched, 'ratio');
  }
};

const getSearchedValue = (defs, values) => {
  let searched = [];
  const defaultDef = find(defs, { default: true });
  
  forEach(values, (val) => {
    if (val.includes('=')) {
      forEach(defs, (def) => {
        const [left, right] = val.split('=');
        if (!def.fixed &&  left=== def.label) {
          searched.push({
            field: def.field,
            value: right,
          });
        }
      });
    } else {
      let matched = false;
      forEach(defs, (def) => {
        const fixedItem = find(def.list, { label: val });
        if (def.fixed && fixedItem) {
          matched = true;
          searched.push({
            field: def.field,
            value: fixedItem.value,
          });
        }
      });
      if (!matched && defaultDef) {
        searched.push({
          field: defaultDef.field,
          value: val,
        });
      }
    }
  });

  return searched;
};

const useContextSearch = (optionDefs) => {
  const defaultOptions = useMemo(() => getDefaultOptions(optionDefs), [optionDefs]);
  const getOptions = (value) => {
    if (!value) {
      return map(filter(defaultOptions, { fixed: true }), 'label');
    }
    if (value.includes('=')) {
      const list = map(filter(defaultOptions, { fixed: false }), 'label');
      let [left, right] = value.split('=');
      left = trim(left);
      right = trim(right);
      const matchedList = getMostMached(list, left, true);
      // show most matched expression
      return map(matchedList, matched => {
        return `${matched.label}=${right}`;
      });
    } else {
      let [fixedList, notFixedList] = [[], []];
      forEach(defaultOptions, item => {
        if (item.fixed) {
          fixedList.push(item.label);
        } else {
          notFixedList.push(item.label);
        }
      });
      const matchedList = getMostMached(fixedList, value, true);
      // query matched fixed value
      let list = map(matchedList, 'label');
      // concat searching expression at end
      return list.concat(map(notFixedList, item => `${item}=${value}`));
    }
  };
  const getValue = (value, action) => {
    if (action === 'remove') {
      return value;
    }
    let newVal = value[value.length - 1];
    // if input a expression
    if (newVal.includes('=')) {
      let list = [];
      let [left, right] = newVal.split('=');
      left = trim(left);
      right = trim(right);
      forEach(defaultOptions, (item) => {
        if (!item.fixed) {
          list.push(item.label);
        }
      });
      const matched = getMostMached(list, left);
      // if we can't find a valid field, show error message.
      if (!matched) {
        showError('Invalid searching key.');
        value.pop();
        return value;
      }
      // if input value on right side of '=' is empty, show error message.
      if (!right) {
        showError('Please provide a valid searching value.');
        value.pop();
        return value;
      }
      value[value.length - 1] = `${matched.label}=${right}`;
    } else {
      // if input a value
      const matched = getMostMached(map(filter(defaultOptions, { fixed: true }), 'label'), newVal);
      // match a enumerable item
      if (matched) {
        value[value.length - 1] = matched.label;
      }
    }
    return uniq(value);
  };
  const handleSearch = (value) => {
    return getSearchedValue(optionDefs,value);
  };
  return {
    getOptions,
    getValue,
    handleSearch,
  };
};

export default useContextSearch;