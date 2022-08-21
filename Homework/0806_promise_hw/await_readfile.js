const fs = require("fs");

function readFile(fileName, coding) {
  //建立一個函數 帶入檔案名稱及編碼格式
  return new Promise((resolve, reject) => {
    //回傳一個 promise 物件
    fs.readFile(fileName, coding, (err, data) => {
      if (!err) {
        resolve(data); //成功
      } else {
        reject("錯誤", err); //失敗
      }
    });
  });
};

async function asyncReadFile() {
  try {
    let content = await readFile("test.txt", "utf8");
    console.log(content);
  } catch(err) {
    console.log("catch", err);
  }
};

asyncReadFile();