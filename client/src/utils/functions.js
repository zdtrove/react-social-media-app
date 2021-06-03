export const inputLengthClass = (length, success, warning) => {
	return length <= success ? 'text-success' : length <= warning ? 'text-warning' : 'text-danger'
}