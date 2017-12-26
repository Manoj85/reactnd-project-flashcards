export function capitalize (str = '') {
	return typeof str !== 'string'
		? ''
		: str[0].toUpperCase() + str.slice(1)
}

export function guid() {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    return `${(s4() + s4()).toLowerCase()}`
}

export function isEmpty(obj){
    return (Object.getOwnPropertyNames(obj).length === 0);
}

export function isEmptyOrNull (s) {
    return s === null || (s.trim && s.trim() === '')
}

export function roundToDecimals(value, decimals) {
    return Number(Math.round(value +'e'+ decimals) +'e-'+ decimals).toFixed(decimals);
}



