function serialize<T>(arg: T): T {
	return JSON.parse(JSON.stringify(arg));
}

export default serialize;
