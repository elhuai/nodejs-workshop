import axios from 'axios';
import { API_URL, IMAGE_URL } from '../utils/config';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';

const About = () => {
  // 取得有關於member得資料
  // const [member, setMember] = useState(null);
  const{member,setMember} = useAuth();
  // TODO轉跳
  // member是null的時候轉跳到login

  useEffect(() => {
    let getMember = async () => {
      let response = await axios.get(`${API_URL}/member`, {
        // 因為要把cookie送進來 所以要加
        withCredentials: true,
      });
      // setter函式改變狀態
      setMember(response.data);
    };
    // 執行
    getMember();
  }, []);
  return (
    <div className="m-7">
      <h2 className="m-7 text-2xl text-gray-600">這裡是魚股市</h2>
      {member ? (
        <>
          <h3>Hi, {member.name}</h3>
          <img src={IMAGE_URL + member.photo} />
        </>
      ) : (
        <alert>請先登入</alert>
      )}
    </div>
  );
};

export default About;
