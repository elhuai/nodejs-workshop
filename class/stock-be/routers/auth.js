const express = require('express');
const router = express.Router();
const pool = require('../utils/db');
// 可以針對這個 router 使用某些中間件
// router.use(express.json());
// for hash password

// 使用雜湊的套件 npm i bcrypt
const bcrypt = require('bcrypt');

// 後端使用驗證套件
// validationResult是拿結果的－＞這是一個Setter函式 req給他就可以幫我們把結果拿出來
const { body, validationResult } = require('express-validator');

// 因為要檢查的位置有點多 所以用陣列來表示
const registerRules = [
  //第一個中間件：檢查 email 是否合法
  // isEmail 是套件提供的
  body('email').isEmail().withMessage('Email 欄位請填寫正確格式'),
  //第二個中間件：檢查密碼長度
  // isLength
  body('password').isLength({ min: 8 }).withMessage('密碼長度至少為8'),
  //第三個中間件：檢查PASSWORD & CONFIRMPASSWORD 是否一致
  //自訂義的檢查
  body('confirmPassword')
    .custom((value, { req }) => {
      console.log('{req}', { req });
      // {req} 回傳的資料會是一個物件
      return value === req.body.password;
      // value= confirmPassword
    })
    .withMessage('密碼驗證不一致'),
];

const authRules = [
  // 中間件: 檢查 email 是否合法
  body('email').isEmail().withMessage('登入登入登入登入登入Email 欄位請填寫正確格式'),
  // 中間件: 檢查密碼長度
  body('password').isLength({ min: 8 }).withMessage('登入登入登入登入登入密碼長度至少為 8'),
];

// node.js 內建的物件
//  因為有時候用\又用/ 所以用path排除不同瀏覽器的相異設定
const path = require('path');

// npm i multer
const multer = require('multer');
// 首先設定圖片要存哪裡
// multer 提供儲存在硬碟的功能 diskStorage
// {} 中設定存檔的目的地－＞放檔案夾（要自己先手動建好）－public/uploads
// 基本版寫法  destination:function(req,file,cb){}
// cb 是callback
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // node,.js 提供的變數 __dirname 抓到檔案的位置
    // 現在執行的檔案在router資料夾裡 所以後面再加上要的資料夾

    // cb(null, __dirname+'/../public/upload')
    // path.join (加入/連接) 避免不同作業喜桶中的 \ 和 /
    cb(null, path.join(__dirname, '..', 'public', 'uploads'));
  },

  // 記得設定圖片名稱
  filename: function (req, file, cb) {
    // 要把使用者上傳的檔案名稱改掉－＞避免重複／名字過長等等的狀況
    console.log('file', file);
    // {
    //   fieldname: 'photo',
    //   originalname: 'japan04-200.jpg',
    //   encoding: '7bit',
    //   mimetype: 'image/jpeg'
    // }
    // 先抓原始名稱來做修改
    // 把使用者的黨名切割多份 然後取結尾命名
    // 原始檔名: file.originalname => test.abc.png
    const ext = file.originalname.split('.').pop();
    // 也可以使用 uuid (128位元識別碼)
    // https://www.npmjs.com/package/uuid
    cb(null, `member-${Date.now()}.${ext}`);
  },
});

const uploader = multer({
  storage: storage,
  // 檔案型別的設定（簡單篩選）
  fileFilter: function (req, file, cb) {
    if ((file.mimetype !== 'image/jpeg') & (file.mimetype !== 'image/jpg') && file.mimetype !== 'image/png') {
      // 再抓mimetype來做檢查
      // 如果檔案類型三個都不是 就callback 一個錯誤Error物件
      cb(new Error('上傳的檔案型態不接受'), false);
    } else {
      // 如果沒有錯就True
      cb(null, true);
    }
  },
  // 過濾檔案的大小
  limits: {
    // 1K =1024 ; 200K =200*1024
    fileSize: 200 * 1024,
    // 可以保持這個算式 這樣會知道是200k
  },
});
// 3002/api/1.0/auth/register
router.post('/api/1.0/auth/register', uploader.single('photo'), registerRules, async (req, res, next) => {
  // , uploader.single('photo') 傳一張照片－＞會是一個物件 可以傳多張圖，但SINGLE就不用打
  // requireRules 是一個陣列 所以會跑完全部的陣列之後 才會傳給async
  // 從api的網站抓下來 email 資料之後，再去做回應 資料回傳－>async放這
  console.log('register', req.body);

  // 要用 try-catch 把 await 程式包起來

  // log確認資料有沒有收到
  console.log('register', req.body, req.file);
  // 驗證來自前端的資料
  // 這是為了 UX 這樣就不用回傳資料庫後 才知道有錯
  const validateResult = validationResult(req);
  console.log('validateResult', validateResult);
  if (!validateResult.isEmpty()) {
    // validateResult 不是空 -> 有錯誤 呈現400 -> 回覆json給前端
    return res.status(400).json({ error: validateResult.array() });
  }
  // 檢查 email 有沒有重複 -> 不能有重複
  // 方法1: 交給 DB: 把 email 欄位設定成 unique
  // 方法2: 我們自己去檢查 -> 去資料撈撈看這個 email 有沒有存在
  let [members] = await pool.execute('SELECT * FROM members WHERE email = ?', [req.body.email]);
  //  檢查 email 有沒有重複－＞不允許重複的 email 註冊
  if (members.length > 0) {
    // 如果有，回覆 400 跟錯誤訊息
    // members 的長度 > 0 -> 有資料 -> 這個 email 註冊過
    return res.status(400).json({ message: '這個 email 已經註冊過' });
  }
  // 密碼要雜湊 hash-> npm i bcrypt
  let hashedPassword = await bcrypt.hash(req.body.password, 10);
  // 後端檢查一下 前端有沒有上傳圖片
  let filename = req.file ? '/uploads/' + req.file.filename : '';
  // 等到拿到資料輸入完的資料 再做匯入資料庫
  //  資料存到資料庫 －＞記得用(?),[]
  let result = await pool.execute('INSERT INTO members (email, password,name,photo)VALUES (?,?,?,?)', [req.body.email, hashedPassword, req.body.name, filename]);
  console.log('insert new member', result);
  // 回覆前端
  res.json({ message: 'OK' });
});

router.post('/api/1.0/auth/login', authRules, async (req, res, next) => {
  console.log('login', req.body);
  // 資料驗證
  const authValidateResult = validationResult(req);
  console.log('登入authValidateResult', authValidateResult);
  if (!authValidateResult.isEmpty()) {
    // authValidateResult 不是空 -> 有錯誤 呈現400 -> 回覆json給前端
    return res.status(400).json({ error: authValidateResult.array() });
  }

  // 確認這個email有沒有註冊過
  let [members] = await pool.execute('SELECT * FROM members WHERE email = ?', [req.body.email]);
  // 這個回傳一個陣列 第一個陣列是data [{}]
  if (members.length == 0) {
    // member長度大於0－＞有註冊過
    // 為了資訊安全所以在登入這邊要給模糊資訊
    return res.status(401).json({ message: '登入的帳號或密碼錯誤' });
  }
  // 因為email不能重複 所以可以直接撈零就好(只有唯一一筆資料)
  let member = members[0];
  // (X) bcrypt.hash(req.body.password) === member.password
  // 比較密碼有無一致
  let compareResult = await bcrypt.compare(req.body.password, member.password);
  if (!compareResult) {
    // 如果密碼不對，就回覆 401
    return res.status(401).json({ message: '帳號或密碼錯誤' });
  }
<<<<<<< HEAD
  // 密碼比對成功 -> (1) jwt token (2) session/cookie
=======
  // TODO: 密碼比對成功 -> (1) jwt token (2) session/cookie
>>>>>>> d83c593df41b9e1dde89f1c68fb13790bc8b59c8
  let saveMember = {
    id: member.id,
    name: member.name,
    email: member.email,
    photo: member.photo,
<<<<<<< HEAD
    // loginDt: new Date().toISOString(),
    // 紀錄登入的時間
=======
>>>>>>> d83c593df41b9e1dde89f1c68fb13790bc8b59c8
  };
  // 把資料寫進 session 裡面
  req.session.member = saveMember;
  // 重點是如何讓前端記住 session id
<<<<<<< HEAD
  // 回覆前端登入成功
  res.json({ saveMember });
});

// 登出
router.get('/api/1.0/auth/logout', (req, res, next) => {
  req.session.member = null;
  // 如果session.member 沒有資料這樣就會抓不到後端的內容
  res.json({ message: '登出成功' });
=======
  // TODO: 回覆前端登入成功
  res.json({ saveMember });
>>>>>>> d83c593df41b9e1dde89f1c68fb13790bc8b59c8
});

module.exports = router;

// ```json=
// {"email":"ashleylai58@gmail.com","name":"ashley","password":"testtest","confirmPassword":"testtest"}
// ```
