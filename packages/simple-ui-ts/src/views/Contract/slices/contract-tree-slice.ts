import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppRootState } from '../../../store';
import util from '../../../util';

export interface Node {
  id: number;
  name: string;
  hidden: boolean;
  type: string;
  extraData: {
    type: string;
    contractBody: number;
  };
  children: Node[];
}

interface Slice {
  tree: Node | null;
  selectedNodeID: number | null;
}

const initialState: Slice = {
  tree: null,
  selectedNodeID: null,
};

export const contractTreeSlice = createSlice({
  name: 'contract/tree',
  initialState,
  reducers: {
    updateContractTree: (state, action: PayloadAction<Node | null>) => {
      state.tree = action.payload;
    },
    redrawCurrentContractTree: (state) => {
      if (state.tree) {
        state.tree = { ...state.tree };
      }
    },
    updateContractTreeNodeName: (state, action: PayloadAction<{ node: number; name: string }>) => {
      let target = util.findTreeNode(action.payload.node, state.tree, (item: any) => item.extraData.contractBody);
      target.name = action.payload.name;
    },
    clearCurrentTree: (state) => {
      state.tree = null;
      state.selectedNodeID = null;
    },
    updateSelectedNodeID: (state, action: PayloadAction<number | null>) => {
      state.selectedNodeID = action.payload;
    },
  },
});

export const {
  updateContractTree,
  clearCurrentTree,
  updateSelectedNodeID,
  updateContractTreeNodeName,
  redrawCurrentContractTree,
} = contractTreeSlice.actions;

export const selectContractTree = (state: AppRootState) => state.contractTree.tree;

export const selectSelectedNodeID = (state: AppRootState) => state.contractTree.selectedNodeID;

export const contractTreeReducer = contractTreeSlice.reducer;

export default contractTreeReducer;
