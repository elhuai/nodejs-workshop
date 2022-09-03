import { API_URL } from '../utils/config';
import axios from 'axios';
import { useState } from 'react';

const Register = () => {
  const [member, setMember] = useState({
    email: '123@gmail.com',
    name: 'ley',
    password: 'testtest',
    confirmPassword: 'testtest',
    photo:'',
    // 先預設照片為空值
  });

  function handleChange(e) {
    console.log('handleChange', e.target.name, e.target.value);
    // let newMember = { ...member };
    // newMember['name']
    // newMember['email']
    // newMember[e.target.name] = e.target.value;
    // setMember(newMember);
    // 比較潮的寫法
    // 先將物件複製－>找到[name]的key值後加入value資訊－＞改變狀態帶入setter函數
    setMember({ ...member, [e.target.name]: e.target.value });
  }



  function handleUpload(e){
    // type=file 的 input
    // 選好的檔案是放在 e.target.files[0]
    setMember({ ...member, photo: e.target.files[0] });
    
  }
  
  async function handleSubmit(e) {
    // 把預設行為關掉
    e.preventDefault();
    try {
      // 方法1: 沒有圖片上傳、單純 post 一個 JSON 物件而已
      // 直接把
      // let response = await axios.post(`${API_URL}/auth/register`, member);
      // console.log(response.data);
      
      // JSON 放不進來 image 檔案，所以需要將圖片轉成文字
      // 所以這個寫法不行變成JSON所以改寫法'
      
      // 方法2: 要上傳圖片 FormDate
      // 有二進位資料（excel表、圖片...無法用文字呈現的檔案）
      let formData = new FormData();
      formData.append('email', member.email);
      formData.append('name', member.name);
      formData.append('password', member.password);
      formData.append('confirmPassword', member.confirmPassword);
      formData.append('photo', member.photo);
      let response = await axios.post(`${API_URL}/auth/register`, formData);
      console.log(response.data);

    } catch (e) {
      console.error('register', e);
    }
  }

  // const [email, setEmail] = useState('');
  return (
    <form className="bg-purple-100 h-screen md:h-full md:my-20 md:mx-16 lg:mx-28 xl:mx-40 py-16 md:py-8 px-24 text-gray-800 md:shadow md:rounded flex flex-col md:justify-center">
      <h2 className="flex justify-center text-3xl mb-6 border-b-2 pb-2 border-gray-300">註冊帳戶</h2>
      <div className="mb-4 text-2xl">
        <label htmlFor="name" className="flex mb-2 w-32">
          Email
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="text"
          id="email"
          name="email"
          // member.email 是 react
          value={member.email}
          // onChange={(e) => {
          //   // 原生的其實有改變
          //   console.log(e.target.value, e.target.name);
          //   // 不能直接去動 state
          //   // (X) member.email = e.target.value;
          //   // 把原本的 member 複製一個出來
          //   let newMember = { ...member };
          //   newMember.email = e.target.value;
          //   setMember(newMember);
          // }}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4 text-2xl">
        <label htmlFor="name" className="flex mb-2 w-32">
          姓名
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="text"
          id="name"
          name="name"
          value={member.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4 text-2xl">
        <label htmlFor="password" className="flex mb-2 w-16">
          密碼
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="password"
          id="password"
          name="password"
          value={member.password}
          onChange={handleChange}
        />
      </div>
      <div className="mb-8 text-2xl">
        <label htmlFor="password" className="flex mb-2 w-32">
          確認密碼
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={member.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div className="mb-8 text-2xl">
        <label htmlFor="photo" className="flex mb-2 w-32">
          圖片
        </label>
        <input className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2" type="file" id="photo" name="photo" 
          onChange={handleUpload}/>
      </div>
      <button className="text-xl bg-indigo-300 px-4 py-2.5 rounded hover:bg-indigo-400 transition duration-200 ease-in" onClick={handleSubmit}>
        註冊
      </button>
    </form>
  );
};

export default Register;
