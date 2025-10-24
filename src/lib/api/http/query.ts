export function buildQuery(params?: Record<string, unknown>): string {
	if (!params) return ''
	const search = new URLSearchParams()
	for (const [k, v] of Object.entries(params)) {
		if (v === undefined || v === null || v === '') continue
		search.append(k, String(v))
	}
	const qs = search.toString()

	return qs ? `?${qs}` : ''
}
