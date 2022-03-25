import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppRootState } from '../../../store';

export interface SelectedNode {
  isRootNode: boolean;
  name: string;
  type: string;
  hiddenFlag: boolean;
  chargeType: Array<string>
  chargeTypeList: Array<string>,
  condition: Array<{ label: string, value: string}>,
}

interface Slice {
  node: SelectedNode | null;
}

const initialState: Slice = {
  node: null,
};

export const contractNodeSlice = createSlice({
  name: 'contract/node',
  initialState,
  reducers: {
    updateContractNode: (state, action: PayloadAction<SelectedNode | null>) => {
      state.node = action.payload;
    },
    clearCurrentNode: (state) => {
      state.node = null;
    },
  },
});

export const { updateContractNode, clearCurrentNode } = contractNodeSlice.actions;

export const selectContractNode = (state: AppRootState) => state.contractNode.node;

export const contractNodeReducer = contractNodeSlice.reducer;

export default contractNodeReducer;
