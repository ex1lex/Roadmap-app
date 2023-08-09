import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IInitialState {
	isLoading: boolean;
}

const initialState: IInitialState = {
	isLoading: true,
};

export const mainReducer = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
	},
});

export const { setLoading } = mainReducer.actions;

export default mainReducer.reducer;
