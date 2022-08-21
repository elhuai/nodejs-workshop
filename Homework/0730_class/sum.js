function sum1(n) {
  //一:for迴圈
  let result = 0;
  for (let i = 1; i <= n; i++) {
    // 這行的執行次數會跟輸入成正比
    // 時間複雜度 0(n)
    // 加法執行的速度比較好
    result += i;
  }
  return result;
}

//二:數學公式
function sum2(n) {
  // 不管n為多少，這行都只有跑1次
  // 時間複雜度 0(1) －＞是個常數 不會因為輸入的大小 而改變
  // 乘除比較花費時間
  // 以演算法、或數字很大的話，用公式的效率比較好
  return ((n + 1) * n) / 2;
}
//三：遞迴recursive
function sum3(n) {
  if (n === 1) {
    return n;
  }
  return sum3(n - 1) + n;
}

// 四：JS-reduce
console.log(sum1(1)); // 1
console.log(sum1(3)); // 6
