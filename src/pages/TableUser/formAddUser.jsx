import React, { useState } from 'react';
import { adddUser, getAllUser } from '../../services/axios';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../services/axios';

function FormAddUser(props) {
     let [inputValue, setInputValue] = useState({ name: '', email: '' })
     const navigate = useNavigate()

     const handleSubmit = async (even) => {
          even.preventDefault()
          try {
               await addUser(inputValue)
               setInputValue({ name: '', email: '' })
               navigate('/tableUser')
               alert('thành công')
          } catch (error) {
               console.log(error)
          }
     }

     return (
          <div className='form__container' onSubmit={handleSubmit}>
               <form className='form'>
                    <div class="form-group">
                         <label for="exampleInputPassword1">Name</label>
                         <input
                              type="text"
                              class="form-control"
                              id="name"
                              placeholder="Enter your name"
                              onChange={(even) => setInputValue({ ...inputValue, name: even.target.value })}
                         />
                    </div>
                    {/* //////////////////////////////////////////////////////////////// */}
                    <div class="form-group">
                         <label for="exampleInputEmail1">Email address</label>
                         <input
                              type="email"
                              class="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Enter email"
                              onChange={(even) => setInputValue({ ...inputValue, email: even.target.value })}
                         />
                    </div>
                    <button
                         // type="submit"
                         class="btn btn-primary"
                    // onClick={() => handleSubmit()}
                    >Submit</button>
               </form>
          </div>
     );
}

export default FormAddUser;