import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatReducerProps } from "../reducerInterface";

const initialState: ChatReducerProps = {
  chatHistory: [],
	chatId: null
}

const chatSlice = createSlice({
	name: 'chatSlice',
	initialState: initialState,
	reducers: {
		setChatId: (state, action: PayloadAction<string>) => {
			state.chatId = action.payload
		}
	}
})

export const {
	setChatId
} = chatSlice.actions
export default chatSlice.reducer