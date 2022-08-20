
// 1. 自動取得今日日期 （可能利用 cron 排程工具 系統每日自動執行）
// 2. 從檔案中讀取股票代碼
// cron 排程工具 可以自動抓資料

const axios = require('axios')
const moment = require('moment');
const fs = require("fs");
const fsPromises = require('fs').promises;

let queryDate = moment().format('YYYYMMDD'); //'20220814';

(async () => {
  try {
    let stockNum = await fsPromises.readFile('stock.txt', 'utf8')
    let queryName = await axios.get(`https://www.twse.com.tw/zh/api/codeQuery`,{
        params:{
            query:stockNum,
        },
    });
    console.log(queryName.suggestions);
    
    let response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY`, {
      params: {
        response: 'json',
        date: queryDate,
        stockNo: stockNum,
      },
    });
    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
})(); 