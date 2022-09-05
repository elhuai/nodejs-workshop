import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../img/fish.png';
import {API_URL,IMAGE_URL } from '../utils/config';
import { useAuth } from '../context/auth';  //會員權限控管
import axios from 'axios';

const Navbar = () => {
  // const [isLogout,setIsLogout] = useState(false);
  // 透過 use Auth 把資料拿出來用－＞確定會員有資訊
  // 把 member, setMember 從 auth context 裡頭拿出來
  const { member, setMember } = useAuth();

  // TODO
  async function handleLogout(){
    let response = await axios.get(`${API_URL}/auth/logout`,{
// 跟會員權限有關係的都要加上這行
      withCredentials:true,
    });
    console.log(response.data);
    setMember(null);
    // 登出之後就把資料設定為null
  }

  return (
    <nav className="bg-indigo-100 px-10 py-3 flex justify-between items-center sticky shadow">
      <Link to={'/'}>
        <div className="flex items-center cursor-pointer">
          <img src={Logo} width="50" alt="Logo" className="mr-2" />
          <span className="text-2xl text-gray-700 text-opacity-70">魚股市</span>
        </div>
      </Link>

      <div className="flex items-center ">
        <NavLink to="/" className="text-xl text-gray-700 text-opacity-70 mx-3 md:mx-6 hover:text-opacity-90" activestyle={{ fontWeight: 'bold', color: '#3B82F6' }}>
          股票
        </NavLink>
        <NavLink to="/about" className="text-xl text-gray-700 text-opacity-70 mx-3 md:mx-6 hover:text-opacity-90" activestyle={{ fontWeight: 'bold', color: '#3B82F6' }}>
          關於
        </NavLink>
        {/* 以會員是否登入 來顯示「登出」／「登入」「註冊」 */}
{member?(
<>
        {/* 登入後顯示的 */}
        Hi, {member.name}
        <img src={IMAGE_URL+member.photo} style={{ width: '80px', borderRadius:50,}} />
        {/* TODO */}
        <Link to="/about" onClick={handleLogout} className="text-xl text-gray-700 text-opacity-70 mx-3 md:mx-6 hover:text-opacity-90">
          登出
        </Link>
        </>
        ):(
          <>
        {/* 登入前顯示的 */}
        <NavLink to="/login" className="text-xl text-gray-700 text-opacity-70 mx-3 md:mx-6 hover:text-opacity-90" activestyle={{ fontWeight: 'bold', color: '#3B82F6' }}>
          登入
        </NavLink>
        <NavLink to="/register" className="text-xl text-gray-700 text-opacity-70 mx-3 md:mx-6 hover:text-opacity-90" activestyle={{ fontWeight: 'bold', color: '#3B82F6' }}>
          註冊
        </NavLink></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
