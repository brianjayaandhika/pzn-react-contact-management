import type { Paging } from '@/lib/api/http/http.types'

export type ContactId = string

export type Contact = {
	id: ContactId
	firstName: string
	lastName: string
	email: string
	phone: string
}

export type CreateContactRequest = {
	firstName: string
	lastName: string
	email: string
	phone: string
}

export type UpdateContactRequest = {
	firstName: string
	lastName: string
	email: string
	phone: string
}

export type ContactSearchQuery = {
	name?: string
	phone?: string
	email?: string
	page?: number // default 0
	size?: number // default 10
}

export type ContactSearchSuccess = {
	data: Contact[]
	paging: Paging
}
