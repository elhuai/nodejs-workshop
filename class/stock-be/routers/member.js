const express = require('express');
const router = express.Router();
// todo 加入checkLogin

// 登入後才可以使用
router.get('/', (req, res, next) => {
  // 1.判斷是否登入－＞判斷session有沒有member這筆資料
  // 如果沒有資料就是沒有登入過
  if (!req.session.member) {
    // 2.尚未登入－＞return res.status().json()
    // 不知道這個人是誰－＞401
    return res.status(401).json({ message: '尚未登入' });
  }
  // 方法一：
  // 根據 session 中存的會員 id 去撈資料庫，把資料庫的會員資料回覆給前端
  // 優點：資料即時跟正確
  // 缺點：會一直發請求給資料庫

  // 方法二：
  // 直接回 session資料
  // 無需去讀資料庫，但要記得去更新
  // Note: 如果有提供修改會員資料功能，更新成功後，要去更新 session
  res.json(req.session.member);
});
module.exports = router;
