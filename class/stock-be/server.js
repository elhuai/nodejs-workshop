// 記得有改.env的話就要 npm start 去重新打包
// 修改完成啟動 nodemon server.js 確定 express 有成功 資料才會跑到前端

const express = require('express');
// 利用 express 這個框架/函式庫 來建立一個 web application
const app = express();
// 初始化 dotenv
require('dotenv').config();

// 在程式碼中，不要讓某些常數散亂在專案的各處
// 至少在同一個檔案中，可以放到最上方統一管理
// 目標是: 只需要改一個地方，全部的地方就生效
// 降低漏改到的風險 -> 降低程式出錯的風險
const port = process.env.SERVER_PORT || 3002;

const path = require('path');

// npm i session-file-store
// npm i express-session
// TODO:
const expressSession = require('express-session');
// 把 session 存在硬碟中
var FileStore = require('session-file-store')(expressSession);
app.use(
  expressSession({
    store: new FileStore({
      // 告訴資料要儲存的路徑
      // session 檔案理當要放在 be 裡面
      // 但因為 nodemonitor 會在資料有所變動的時候就會重啟檔案
      // 所以把 session 資料夾建在 be 檔案的平等層
      path: path.join(__dirname, '..', 'sessions'),
    }),
    secret: process.env.SESSION_SECRET,
    // 如果 SESSION沒有改變的話
    // resave 是記憶體中的資料庫－＞想要存資料庫
    // 如果是要存在記憶體中－就要設定ture
    // 暫時的檔案夾給他－true有出現的檔案
    // 如果 session 沒有改變的話，要不要重新儲存一次？
    resave: false,
    // 還沒初始化的，要不要存
    saveUninitialized: false,
  })
);

// npm i cors
const cors = require('cors');
// 使用這個第三方提供的 cors 中間件
// 來允許跨源存取
// 預設都是全部開放
app.use(cors());
// 使用情境: 當前後端網址不同時，只想允許自己的前端來跨源存取
//          就可以利用 origin 這個設定來限制，不然預設是 * (全部)
// const corsOptions = {
//   origin: ['http://localhost:3000'],
// };
// app.use(cors(corsOptions));

// 引用 server 需要的資料庫模組
const pool = require('./utils/db');

// 如果要讓 express 認得 json
// Content-Type: application/json
// 就要加上這個中間件
app.use(express.json());

// 設定視圖引擎，我們用的是 pug
// npm i pug
app.set('view engine', 'pug');
// 告訴 express 視圖在哪裡
app.set('views', 'views');

// 設置圖片的靜態檔案 讓圖片快取顯示
// const path = require('path');
// express.static() －＞讓靜態檔案可以有網址
// 重點不是檔案的位置
// 是圖片的網址
// 可以讀取public底下所有資料
// 如果不打'public' 這樣網址就要打出來public－>http://localhost:3002/public/uploads/member-1662204981234.png
// __dirname 表示你所執行的檔案的上一層－＞server.js的母層－stock.be
app.use(express.static(path.join(__dirname, 'public')));

// 測試 server side render 的寫法
app.get('/ssr', (req, res, next) => {
  // views/index.pug
  res.render('index', {
    stocks: ['台積電', '長榮航', '聯發科'],
  });
});

// express 是由 middleware 組成的
// request -> middleware 1 -> middleware 2 -> ... -> reponse
// 中間件的順序很重要!!
// Express 會按照你程式碼的順序(由上到下)去決定 next 是誰
// 中間件裡一定要有 next 或者 response
// - next() 往下一關走
// - res.xxx 結束這次的旅程 (req-res cycle)
// pipeline pattern

// 一般的 middleware
app.use((req, res, next) => {
  console.log('這是中間件 A');
  let now = new Date();
  console.log(`有人來訪問喔 at ${now.toISOString()}`);
  // 一定要寫，讓 express 知道要跳去下一個中間件
  next();
});

app.use((req, res, next) => {
  console.log('這是中間件 C');
  // 一定要寫，讓 express 知道要跳去下一個中間件
  next();
});

// 路由中間件
// app.[method]
// method: get, post, delete, put, patch, ...
// GET /
app.get('/', (req, res, next) => {
  console.log('這裡是首頁');
  res.send('Hello Express');
});
app.get('/test', (req, res, next) => {
  console.log('這裡是 test 1');
  res.send('Hello Test 1');
  // next();
});

let stockRouter = require('./routers/stocks');
app.use('/api/1.0/stocks', stockRouter);
// /api/1.0/stocks
// /api/1.0/stocks/:stockId

let authRouter = require('./routers/auth');
app.use(authRouter);

// app.get('/test', (req, res, next) => {
//   console.log('這裡是 test 2');
//   res.send('Hello Test 2');
// });

// 在所有的路由中間件的下面
// 既然前面所有的「網址」都比不到，表示前面沒有任何符合的網址 (旅程一直沒有被結束)
// --> 404
// 利用這個特殊的順序，把這裡當成 404
app.use((req, res, next) => {
  console.log('在所有路由中間件的下面 -> 404 了！');
  res.status(404).send('Not Found!!');
  // 這裡用send
});

// 啟動 server，並且開始 listen 一個 port
app.listen(port, () => {
  console.log(`server start at ${port}`);
});
