const fs = require("fs"); 

function readFile(fileName, coding) {  //建立一個函數 帶入檔案名稱及編碼格式
  return new Promise((resolve, reject) => { //回傳一個 promise 物件
    fs.readFile(fileName, coding, (err, data) => { 
      if (!err) {
        resolve(data); //成功
      } else {
        reject("發生錯誤", err); //失敗
      }
    });
  });
}
readFile("test.txt", "utf8") //執行函數帶入要讀取的檔案名, 字元編碼 
.then((data)=>{ //成功用 then 讀出內容
    console.log(data);
}).catch((err)=>{ //失敗用 catch 回覆 發生錯誤
    console.log(err);
});

