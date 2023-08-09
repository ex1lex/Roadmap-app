import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IItem } from '../../../core/types';

interface IInitialState {
	data: IItem[];
}

const initialState: IInitialState = {
	data: [],
};

export const homeReducer = createSlice({
	name: 'home',
	initialState,
	reducers: {
		setData: (state, action: PayloadAction<IItem[]>) => {
			state.data = action.payload;
		},
	},
});

export const { setData } = homeReducer.actions;

export default homeReducer.reducer;
