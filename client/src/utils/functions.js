export const inputLengthClass = (length, success, warningSmall = null, warningBig) => {
	if (warningSmall) return (length < warningSmall || length > warningBig) ? 'text-danger' : length <= success ? 'text-success' : 'text-warning'
	return length <= success ? 'text-success' : length <= warningBig ? 'text-warning' : 'text-danger'
}