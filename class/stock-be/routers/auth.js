const express = require("express");
const router = express.Router();
const pool = require("../utils/db");
// 可以針對這個 router 使用某些中間件
// router.use(express.json());
// for hash password
const bcrypt = require("bcrypt");
// 使用雜湊的套件

//  
router.post("/api/1.0/auth/register", async (req, res, next) => {
  // 從api的網站抓下來 email 資料之後，再去做回應 資料回傳－>async放這
  // log確認資料有沒有收到
  console.log("register", req.body);
  // TODO: 驗證來自前端的資料
  // 檢查 email 有沒有重複 -> 不能有重複
  // 方法1: 交給 DB: 把 email 欄位設定成 unique
  // 方法2: 我們自己去檢查 -> 去資料撈撈看這個 email 有沒有存在
  // TODO: 檢查 email 有沒有重複－＞不允許重複的 email 註冊
  let [members] = await pool.execute("SELECT * FROM members WHERE email = ?", [
    req.body.email,
  ]);
  if (members.length == 0) {
    // TODO: 密碼要雜湊 hash-> npm i bcrypt
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    // TODO: 資料存到資料庫 －＞記得用(?),[]
    let result = await pool.execute('INSERT INTO members (email, password,name)VALUES (?,?,?)',[req.body.email, hashedPassword, req.body.name])
    // 等到拿到資料輸入完的資料 再做匯入資料庫
    
    // TODO: 回覆前端
    return res.json({ message: "OK" });
  } else {
    //     TODO: 如果有，回覆 400 跟錯誤訊息
    return res.status(400).json({ message: "這個 email 已經註冊過了" });
  }
});

module.exports = router;

// ```json=
// {"email":"ashleylai58@gmail.com","name":"ashley","password":"testtest","confirmPassword":"testtest"}
// ```
