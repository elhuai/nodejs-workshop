import { API_URL } from '../utils/config';
import axios from "axios";
import { useState } from "react";
import { Navigate } from 'react-router-dom';
// 要通知那個人登入了Auth
import { useAuth } from '../context/auth';

// TODO

const Login = () => {
// 拿出資料
const{member,setMember} = useAuth();
  // loginMember 是個物件 所以給她一個初始值
  const[loginMember, setLoginMember] = useState({
    // 可以將初始值先打好 這樣測試時才不用一值重複打
    email: 'CCC@gmail.com', password: 'testtest' 
  })
  // TODO
  const[isLogin,setIsLogin]=useState(false);

  function handleChange(e){
    setLoginMember({...loginMember,[e.target.name]:e.target.value})
    // 先複製一個loginMember
    // 增加一個name的key值 賦予value值
  }

  // 登入成功
  async function handleSubmit(e){
    e.preventDefault();
    // 解除表單預設的送出
    let response = await axios.post(`${API_URL}/auth/login`, loginMember,{
    // 為了 cookie 可以跨源存取
    // 記得前端的每一個檔案都要設定（只要有需要知道是否登入狀態）
    withCredentials:true,
  });
    console.log(response.data);
    // 如果有登入成功的話 還要告訴 context 會員有資料了
    setMember(response.data)
    // 設定自動轉跳 登入成功會設成true
    setIsLogin(true);
  }
// TODO
  // 只要有資料改變就會 重新 render
    // console.log('testtest');
  if(isLogin){
    return <Navigate to="/about" />
  }

  return (
    <form className="bg-purple-100 h-screen md:h-full md:my-20 md:mx-16 lg:mx-28 xl:mx-40 py-16 md:py-8 px-24 text-gray-800 md:shadow md:rounded flex flex-col md:justify-center">
      <h2 className="flex justify-center text-3xl mb-6 border-b-2 pb-2 border-gray-300">登入帳戶</h2>
      <div className="mb-4 text-2xl">
        <label htmlFor="name" className="flex mb-2 w-32">
          Email
        </label>
        <input className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2" type="text" id="email" name="email" value={loginMember.email} onChange={handleChange}/>
      </div>
      <div className="mb-8 text-2xl">
        <label htmlFor="password" className="flex mb-2 w-16">
          密碼
        </label>
        <input className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2" type="password" id="password" name="password" value={loginMember.password} onChange={handleChange}/>
      </div>
      <button className="text-xl bg-indigo-300 px-4 py-2.5 rounded hover:bg-indigo-400 transition duration-200 ease-in" onClick={handleSubmit}>登入</button>
    </form>
  );
};

export default Login;
