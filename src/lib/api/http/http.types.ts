export type Paging = {
	currentPage: number
	totalPage: number
	size: number
}

export type WebResponse<T> = {
	data?: T
	errors?: string
	paging?: Paging
}
