// 用await
// 用axios目標
// 1.安裝第三方套件 npm i axios
// 2. require引用

const axios = require("axios");

// 開始抓資料
// 台積電2330 長榮 2603
// 設定
// 用axios.get().then().catch()抓資料

let stockNum = 2330;
let queryDate = "20220814";
  // async 設定

(async () => {
    try {
      let response = await axios.get(
        `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date${queryDate}&stockNo=${stockNum}`
      );
      console.log(response.data);
      //   發現資料在 data 裡面 就針對 data 印出即可
    } catch (e) {
      console.error(e);
    }
  }
)();
