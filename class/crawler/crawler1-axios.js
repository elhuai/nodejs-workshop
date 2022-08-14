//// 用 axios 去目標 API 抓資料
// 1.安裝第三方套件 npm i axios
// 2. require引用

const axios = require('axios')

// axios.get(url, 設定)
axios
.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20220813&stockNo=2330&_=1660378514253')
.then((response) => {
//   console.log(response);
  console.log(response.data);
//   發現資料在 data 裡面 就針對 data 印出即可
})
.catch((error) => {
  console.error(error);
});