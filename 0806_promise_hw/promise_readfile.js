const fs = require("fs"); 
var xhrPromise =  new Promise((resolve, reject) => { 
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
        resolve(responseDom.innerHTML = `非同步請求已回覆 ${xhr.responseText}`); //成功
      } else {
        reject(responseDom.innerHTML = `非同步請求失敗，狀態碼 ${xhr.status}`); //失敗
      }
    });
  });

xhr("test.txt", "utf8") 
.then((data)=>{ 
  xhr.open('GET', 'http://54.71.133.152:3000', true);
}).catch((err)=>{ 
    responseDom.innerHTML = `XHR 非同步請求錯誤`;
});
