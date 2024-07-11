import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserCredentialsProps, UserReducerProps } from "../reducerInterface";

const initialState: UserReducerProps = {
  userEmail: null,
	userToken: null
}
const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		updateUserCredentials: (state, action: PayloadAction<UserCredentialsProps>) => {
			state.userEmail = action.payload.userEmail
			state.userToken = action.payload.userToken
		}
	},
	extraReducers(builder) {
		builder
	},
})
export const {
	updateUserCredentials
} = userSlice.actions
export default userSlice.reducer