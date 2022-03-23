import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import assign from 'lodash/assign';
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

interface Slice {
  selectedVersion: number | null;
  versionList: Array<{ version: number, type: string, active: boolean }>;
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

export const contractTreeReducer = contractTreeSlice.reducer;

export default contractTreeReducer;
