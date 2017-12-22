export function capitalize (str = '') {
	return typeof str !== 'string'
		? ''
		: str[0].toUpperCase() + str.slice(1)
}

export function trim (str) {
	return str.length > 16
		? str.slice(0, 16) + '...'
		: str
}

export function guid() {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    return `${(s4() + s4()).toLowerCase()}`
}

export function isEmpty(obj){
    return (!!obj && Object.getOwnPropertyNames(obj).length === 0);
}



