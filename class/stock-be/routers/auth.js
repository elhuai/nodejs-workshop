const express = require('express');
const router = express.Router();

// 可以針對這個 router 使用某些中間件
// router.use(express.json());

// /api/1.0/auth/register
router.post('/api/1.0/auth/register', (req, res, next) => {
  // 確認資料有沒有收到
  console.log('register', req.body);
  // TODO: 檢查 email 有沒有重複
  //     TODO: 如果有，回覆 400 跟錯誤訊息
  // TODO: 密碼要雜湊 hash
  // TODO: 資料存到資料庫
  // TODO: 回覆前端
  res.json({});
});

module.exports = router;

// ```json=
// {"email":"ashleylai58@gmail.com","name":"ashley","password":"testtest","confirmPassword":"testtest"}
// ```