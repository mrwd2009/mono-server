import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppRootState } from '../../../store';

interface Item {
  id: number;
  name: string;
  contractRoot: number;
  version: string;
  type: string;
}

interface ContractList {
  contractList: Item[];
  savedList: Item[];
}

const initialState: ContractList = {
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
  },
});

export const { updateContractList, clearContractList } = contractListSlice.actions;

export const selectContractList = (state: AppRootState) => state.contractList.contractList;

export const selectSavedList = (state: AppRootState) => state.contractList.savedList;

export const contractListReducer = contractListSlice.reducer;

export default contractListReducer;
