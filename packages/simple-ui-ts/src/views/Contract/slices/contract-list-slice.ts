import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import find from 'lodash/find';
import type { AppRootState } from '../../../store';

interface Item {
  id: number;
  name: string;
  contractRoot: number;
  version: string;
  type: string;
}

export interface Version {
  version: number;
  type: string;
  active: false;
}

interface ContractList {
  selected: number | null;
  contractList: Item[];
  savedList: Item[];
  selectedVersion: number | null;
  versionList: Array<Version>;
}

const initialState: ContractList = {
  selected: null,
  contractList: [],
  savedList: [],
  selectedVersion: null,
  versionList: [],
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
    updateVersionList: (state, action: PayloadAction<Array<Version>>) => {
      state.versionList = action.payload;
    },
    updateSelectedVersion: (state, action: PayloadAction<number | null>) => {
      state.selectedVersion = action.payload;
    },
    updateSelectedContract: (state, action: PayloadAction<{ root: number, version: number} | null>) => {
      if (!action.payload) {
        state.selected = null;
        state.selectedVersion = null;
        return;
      }
      state.selected = action.payload.root;
      state.selectedVersion = action.payload.version;
    }
  },
});

export const { updateContractList, clearContractList, updateSelectedContract, updateVersionList, updateSelectedVersion } = contractListSlice.actions;

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
  },
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
  },
);

export const selectSelectedId = (state: AppRootState) => state.contractList.selected;

export const selectSelectedVersion = (state: AppRootState) => state.contractList.selectedVersion;

export const selectCurrentVersionInfo = createSelector(
  (state: AppRootState) => state.contractList.selectedVersion,
  (state: AppRootState) => state.contractList.versionList,
  (selected, list) => {
    return find(list, (item) => {
      return item.version === selected;
    });
  },
);

export const selectVersionList = createSelector(
  (state: AppRootState) => state.contractList.versionList,
  (list) => {
    let approved: Version[] = [];
    let interim: Version[] = [];
    forEach(list, (item) => {
      if (item.type === 'approved') {
        approved.push(item);
      } else {
        interim.push(item);
      }
    });

    return {
      approved,
      interim,
    };
  },
);

export const contractListReducer = contractListSlice.reducer;

export default contractListReducer;
