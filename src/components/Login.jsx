/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
   const [account, setAccount] = useState({
      email: '',
      password: '',
   });
   const [style, setStyle] = useState({ display: 'none' });
   const [style2, setStyle2] = useState({ display: 'none' });

   const onChangeAccount = (e) => {
      setAccount({
         ...account,
         [e.target.name]: e.target.value,
      });
      console.log(account);
   };

   const authLogin = (e) => {
      e.preventDefault();
      if (!account.email.includes('@')) {
         setStyle({ display: 'block' });
         setStyle2({ display: 'block' });
      } else {
         setStyle({ display: 'none' });
         setStyle2({ display: 'none' });
         const postSignin = () => {
            return fetch(`https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signin`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(account),
            })
               .then((res) => {
                  if (!res.ok) {
                     throw new Error(`로그인 정보를 확인해주세요.`);
                  }
                  return res.json();
               })
               .then((data) => {
                  console.log(data);
                  localStorage.setItem('JWT', data.access_token);
                  alert('로그인 되었습니다.');
                  location.href = '/todo';
               })
               .catch((data) => {
                  alert(data.message);
               });
         };
         postSignin();
      }
   };

   return (
      <div>
         <div className="Login Background">
            <div className="Box">
               <h2>로그인</h2>
               <div className="BoxDiv">
                  <FontAwesomeIcon icon={faUser} />
                  <input
                     type="text"
                     placeholder="이메일"
                     autoComplete="email"
                     name="email"
                     onChange={onChangeAccount}
                  />
                  <p className="Alert EmailAlert" style={style}>
                     *올바른 이메일 형식이 아닙니다.
                  </p>
               </div>
               <div className="BoxDiv" style={{ marginBottom: '0' }}>
                  <FontAwesomeIcon icon={faLock} />
                  <input
                     type="password"
                     placeholder="비밀번호"
                     autoComplete="current-password"
                     name="password"
                     onChange={onChangeAccount}
                  />
                  {/* <p className="Alert PWAlert" style={style2}>
                     *비밀번호는 8자 이상이어야 합니다.
                  </p> */}
               </div>
               <button type="submit" onClick={authLogin}>
                  로그인
               </button>
            </div>
         </div>
      </div>
   );
};

export default Login;
