import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import map from 'lodash/map';
import type { AppRootState } from '../../../store';

interface Item {
  id: number;
  name: string;
  contractRoot: number;
  version: string;
  type: string;
}

type SelectedItem = { root: number, version: number } | null;

interface ContractList {
  selected: SelectedItem,
  contractList: Item[];
  savedList: Item[];
}

const initialState: ContractList = {
  selected: null,
  contractList: [],
  savedList: [],
};

export const contractListSlice = createSlice({
  name: 'contract/list',
  initialState,
  reducers: {
    updateContractList: (state, action: PayloadAction<Partial<ContractList>>) => {
      const { contractList, savedList } = action.payload;
      if (contractList) {
        state.contractList = contractList;
      }
      if (savedList) {
        state.savedList = savedList;
      }
    },
    clearContractList: (state) => {
      state.contractList = [];
      state.savedList = [];
    },
    updateSelectedId: (state, action: PayloadAction<SelectedItem>) => {
      state.selected = action.payload;
    },
  },
});

export const { updateContractList, clearContractList, updateSelectedId } = contractListSlice.actions;

export const selectContractList = createSelector(
  (state: AppRootState) => state.contractList.contractList,
  (list) => {
    return map(list, (item: any) => {
      return {
        key: item.id,
        type: 'contract-root',
        label: item.name,
        extraData: item,
      };
    });
  }
);

export const selectSavedList = createSelector(
  (state: AppRootState) => state.contractList.savedList,
  (list) => {
    return map(list, (item: any) => {
      return {
        key: item.id,
        type: item.type,
        label: item.name,
        extraData: item,
      };
    });
  }
);

export const selectSelectedItem = createSelector(
  (state: AppRootState) => state.contractList.selected?.root,
  (state: AppRootState) => state.contractList.selected?.version,
  (root, version) => {
    if (!root || !version) {
      return null;
    }
    return {
      root,
      version,
    };
  },
);

export const selectSelectedId = (state: AppRootState) => state.contractList.selected?.root;

export const contractListReducer = contractListSlice.reducer;

export default contractListReducer;
