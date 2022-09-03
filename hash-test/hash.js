const md5 = require('md5');
console.log('md5:', md5('test12345'));
console.log('md5:', md5('test12345'));
// login: email, password
// select * from members where email = email and password = md5(password)
// 可以用彩虹表來找md5（因為每次雜湊完都一樣）的雜湊密碼

// bcrypt
// npm i bcrypt
const bcrypt = require('bcrypt');
// 用強制執行(()=>{})()
(async () => {
  let result1 = await bcrypt.hash('test12345', 10);
  console.log('bcrypt: ', result1); // len 60
  let result2 = await bcrypt.hash('test12345', 10);
  console.log('bcrypt: ', result2);

  let result3 = await bcrypt.hash('test123457890987736423', 10);
  console.log('bcrypt: ', result3);
})();

// argon2
const argon2 = require('argon2');
(async () => {
  let result1 = await argon2.hash('test12345', 10);
  console.log('argon2: ', result1); // len 96
  let result2 = await argon2.hash('test12345', 10);
  console.log('argon2: ', result2);

  let result3 = await argon2.hash('test123457890987736423', 10);
  console.log('argon2: ', result3);
})();
