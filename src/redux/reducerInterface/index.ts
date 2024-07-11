export interface UserReducerProps {
  userEmail: string | null
	userToken: string | null
}

export interface UserCredentialsProps {
	userEmail: string
	userToken: string
}

interface Chat {
	message: string
	owner: 'user' | 'bot'
}

export interface ChatReducer {
	chatId: string | null
	chatHistory: Chat[]
}