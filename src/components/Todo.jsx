/* eslint-disable */
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';
import React, { useState, useEffect, useCallback } from 'react';
import './Todo.css';
import styled from 'styled-components';

const localArr = localStorage.getItem('JWT');

const Todo = () => {
   const [newList, setNewList] = useState('');
   const [allList, setAllList] = useState([]);
   const [updateValue, setUpdateValue] = useState('');

   const onChangeInput = (e) => {
      setNewList(e.target.value);
   };

   // 목록 get
   const getList = () => {
      return fetch(`https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos`, {
         method: 'GET',
         headers: {
            authorization: `Bearer ${localArr}`,
         },
      })
         .then((res) => res.json())
         .then((datas) => setAllList(datas));
   };
   useEffect(() => {
      getList();
   }, []);

   // 목록 추가
   const addList = (e) => {
      e.preventDefault();
      const postList = () => {
         return fetch(`https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos`, {
            method: 'POST',
            headers: {
               authorization: `Bearer ${localArr}`,
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo: newList }),
         })
            .then((res) => res)
            .then((data) => {
               console.log(data);
               getList();
            });
      };
      postList();
      setNewList('');
   };

   // 목록 수정
   const [changeValue, setChangeValue] = useState('');
   const [key, setKey] = useState('');
   const [togglePopup, setTogglePopup] = useState('none');

   const [readMode, setReadMode] = useState(0);
   const [modifyMode, setModifyMode] = useState(1);

   const editModePopup = (e) => {
      const key = e.target.value;
      setKey(key);
      setTogglePopup('fixed');
   };

   const onChange = (e) => {
      setChangeValue(e.target.value);
   };

   const ModifyPopup = (e) => {
      return (
         <div className="ModiPopup" style={{ display: togglePopup }}>
            <div>
               <h3>todo 수정</h3>
               <input onChange={onChange} value={changeValue} />
               <button type="button" value={key} onClick={modifyList}>
                  완료
               </button>
               <button type="button" onClick={nonePopup}>
                  취소
               </button>
            </div>
         </div>
      );
   };

   const modifyList = (e) => {
      setTogglePopup('none');
      setChangeValue('');
      const modiList = () => {
         return fetch(`https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${key}`, {
            method: 'PUT',
            headers: {
               authorization: `Bearer ${localArr}`,
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo: changeValue, isCompleted: true }),
         })
            .then((res) => res)
            .then((data) => {
               console.log(data);
               getList();
            });
      };
      modiList();
   };

   const nonePopup = () => {
      setTogglePopup('none');
      setChangeValue('');
   };

   // 목록 삭제
   const delList = (e) => {
      e.preventDefault();
      const id = e.target.value;
      const deleteList = () => {
         return fetch(`https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/todos/${id}`, {
            method: 'DELETE',
            headers: {
               authorization: `Bearer ${localArr}`,
            },
         })
            .then((res) => res)
            .then((data) => {
               console.log(data);
               getList();
            });
      };
      deleteList();
   };

   //목록 출력
   const List = () => {
      return (
         <div className="List">
            {allList?.map((e) => {
               return (
                  <div key={e.id} id={e.id} mode={readMode}>
                     <span>{e.todo}</span>
                     <div className="ListBtns">
                        <button type="button" value={e.id} onClick={editModePopup}>
                           수정
                        </button>
                        <button type="button" value={e.id} onClick={delList}>
                           삭제
                        </button>
                     </div>
                     {/* {!edited ? (
                        <div className="ListBtns">
                           <button type="button" value={e.id} onClick={editModeToggle}>
                              수정
                           </button>
                           <button type="button" value={e.id} onClick={delList}>
                              삭제
                           </button>
                        </div>
                     ) : (
                        <div className="ListBtns">
                           <button type="button" value={e.id}>
                              완료
                           </button>
                           <button type="button" value={e.id} onClick={editModeToggle}>
                              취소
                           </button>
                        </div>
                     )} */}
                  </div>
               );
            })}
         </div>
      );
   };

   return localArr ? (
      <div>
         <div className="Background">
            <div className="Todo">
               <div className="TodoList">
                  <h2>투두리스트</h2>
                  <div className="TodoInput">
                     <input type="text" placeholder="할 일을 적어주세요" onChange={onChangeInput} value={newList} />
                     <button type="submit" onClick={addList}>
                        추가
                     </button>
                  </div>
                  <List />
               </div>
            </div>
            <ModifyPopup />
         </div>
      </div>
   ) : (
      (location.href = '/login')
   );
};

export default Todo;
