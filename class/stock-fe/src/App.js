import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Stock from './components/Stock';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import StockDetails from './components/StockDetails';
import NotFound from './components/NotFound';
// 要引入context/auth這個檔案來控管全站的會員權限是否可以使用
import {AuthContext} from './context/auth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from './utils/config';

function App() {
  // 從session中取得member的資料
  // 預設為沒有資料
  const[member, setMember] = useState(null);
  
  useEffect(()=>{
    // 先去member這個網站抓抓看有沒有資料 如果有資料就是有登入
  
    let getMember = async () =>{
      // F12 確認是進入每一個頁面都會跑會員權限確認
      console.log('in APP: check if login');
      let response =await axios.get(`${API_URL}/member`,{
        // 因為要把cookie送進來 所以要加
    withCredentials:true,
      });
      // 把抓到的資料餵進setMember 來改變會員狀態
      setMember(response.data)
    }
    getMember()
  },[]);
  
  return (
    
    // 會先跑跑看有沒有資料 如果有就會設定setMember
    <AuthContext.Provider value={{member,setMember}}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Stock />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stock/:stockId" element={<StockDetails />}>
          <Route path=":currentPage" element={<StockDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
