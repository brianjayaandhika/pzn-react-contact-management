export type User = {
	username: string
	name: string
}

export type RegisterRequest = {
	username: string
	password: string
	name: string
}

export type LoginRequest = {
	username: string
	password: string
}

export type LoginData = {
	token: string
	expireAt: number // ms
}
