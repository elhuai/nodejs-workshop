function sum(n){
	let result = 0;
	for (let i = 1; i <= n; i++) {
		result += i;
	}
	return result;
}
console.log(sum(1)); // 1
console.log(sum(3)); // 6