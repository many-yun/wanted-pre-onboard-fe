/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './Signup.css';

const Signup = () => {
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
   };

   const signupSubmit = (e) => {
      e.preventDefault();
      if (!account.email.includes('@') && account.password.length < 8) {
         setStyle({ display: 'block' });
         setStyle2({ display: 'block' });
      } else if (!account.email.includes('@') && account.password.length >= 8) {
         setStyle({ display: 'block' });
         setStyle2({ display: 'none' });
      } else if (account.email.includes('@') && account.password.length < 8) {
         setStyle({ display: 'none' });
         setStyle2({ display: 'block' });
      } else if (account.email.includes('@') && account.password.length >= 8) {
         setStyle({ display: 'none' });
         setStyle2({ display: 'none' });
         const postSignup = () => {
            return fetch(`https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signup`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(account),
            })
               .then((res) => {
                  if (!res.ok) {
                     throw new Error(`이미 가입된 이메일입니다.`);
                  }
                  return res.json();
               })
               .then((data) => {
                  console.log(data);
                  alert('회원가입이 완료되었습니다.');
                  location.href = '/login';
               })
               .catch((data) => {
                  alert(data.message);
               });
         };
         postSignup();
      }
   };

   return (
      <div>
         <div className="Signup">
            <div className="Box">
               <h2>회원가입</h2>
               <h3>이메일</h3>
               <input type="text" placeholder="이메일" autoComplete="email" name="email" onChange={onChangeAccount} />
               <p className="Alert EmailAlert" style={style}>
                  *@를 포함한 이메일 주소를 작성해주세요.
               </p>
               <h3>비밀번호</h3>
               <input
                  type="password"
                  placeholder="비밀번호"
                  autoComplete="current-password"
                  name="password"
                  onChange={onChangeAccount}
               />
               <p className="Alert PWAlert" style={style2}>
                  *비밀번호는 8자 이상이어야 합니다.
               </p>
               <button type="submit" onClick={signupSubmit}>
                  회원가입
               </button>
            </div>
         </div>
      </div>
   );
};

export default Signup;
