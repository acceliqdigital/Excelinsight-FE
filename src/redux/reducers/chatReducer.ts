import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatAppendPayloadProps, ChatReducerProps } from "../reducerInterface";
import { v4 as uuidv4 } from 'uuid';
const initialState: ChatReducerProps = {
  chatHistory: [],
  chatSessionId: null,
  mediaRoot: ''
}

const chatSlice = createSlice({
	name: 'chatSlice',
	initialState: initialState,
	reducers: {
		setChatSessionId: (state, action: PayloadAction<string>) => {
			state.chatSessionId = action.payload
		},
		appendChat: (state, action: PayloadAction<ChatAppendPayloadProps>) => {
			state.chatHistory = [
				...state.chatHistory,
				{
					messageId: uuidv4(),
					message: action.payload.message,
					owner: action.payload.owner
				}
			]
		},
		clearChat: (state) => {
			state.chatHistory = []
		},
		setMediaDirectory: (state, action: PayloadAction<string>) => {
			state.mediaRoot = action.payload
		}
	}
})

export const {
	setChatSessionId,
	appendChat,
	clearChat,
	setMediaDirectory
} = chatSlice.actions
export default chatSlice.reducer