export interface UserReducerProps {
  userEmail: string | null
	userToken: string | null
}

export interface UserCredentialsProps {
	userEmail: string
	userToken: string
}

export interface ChatAppendPayloadProps {
	message: string
	owner: 'user' | 'bot'
}

export interface Chat {
	message: string
	owner: 'user' | 'bot'
	messageId: string
}

export interface ChatReducerProps {
	chatSessionId: string | null
	chatHistory: Chat[],
	mediaRoot: string
}