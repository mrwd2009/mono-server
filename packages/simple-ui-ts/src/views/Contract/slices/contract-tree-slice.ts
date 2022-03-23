import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import assign from 'lodash/assign';
import forEach from 'lodash/forEach';
import find from 'lodash/find';
import type { AppRootState } from '../../../store';

interface Node {
  id: number;
  name: string;
  hidden: boolean;
  type: string;
  extraData: {
    type: string;
    contractBody: number;
  },
  children: Node[];
}

interface Version {
  version: number;
  type: string;
  active: false;
}

interface Slice {
  selectedVersion: number | null;
  versionList: Array<Version>;
  tree: Node | null;
  selectedNodeID: number | null;
}

const initialState: Slice = {
  selectedVersion: null,
  versionList: [],
  tree: null,
  selectedNodeID: null,
};

export const contractTreeSlice = createSlice({
  name: 'contract/tree',
  initialState,
  reducers: {
    updateContractTree: (state, action: PayloadAction<Partial<Slice>>) => {
      assign(state, action.payload);
    },
    clearContractTree: (state) => {
      assign(state, initialState);
    },
  },
});

export const { updateContractTree, clearContractTree } = contractTreeSlice.actions;

export const selectContractTree = (state: AppRootState) => state.contractTree.tree;

export const selectSelectedVersion = (state: AppRootState) => state.contractTree.selectedVersion;

export const selectCurrentVersionInfo = createSelector(
  (state: AppRootState) => state.contractTree.selectedVersion,
  (state: AppRootState) => state.contractTree.versionList,
  (selected, list) => {
    return find(list, (item) => {
      return item.version === selected;
    });
  }
);

export const selectVersionList = createSelector(
  (state: AppRootState) => state.contractTree.versionList,
  (list) => {
    let approved: Version[] = [];
    let interim: Version[] = [];
    forEach(list, item => {
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

export const contractTreeReducer = contractTreeSlice.reducer;

export default contractTreeReducer;
