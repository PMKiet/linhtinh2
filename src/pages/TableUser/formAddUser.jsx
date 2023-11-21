import React, { useState } from 'react';
import { adddUser, getAllUser } from '../../services/axios';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../services/axios';
import '../../assets/styles/TableUser/formAddUser.scss'
import { NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaArrowLeftLong } from "react-icons/fa6";


function FormAddUser(props) {
     let [inputValue, setInputValue] = useState({ name: '', email: '' })
     let [validInputName, setValidInputName] = useState(false)
     let [validInputEmail, setValidInputEmail] = useState(false)
     const navigate = useNavigate()

     const handleSubmit = async (even) => {
          even.preventDefault()
          try {
               if (inputValue.name && inputValue.email) {
                    await addUser(inputValue)
               } else {
                    if (!inputValue.name) {
                         setValidInputName(true)
                    }
                    if (!inputValue.email) {
                         setValidInputEmail(true)
                    }
                    return
               }

               setInputValue({ name: '', email: '' })
               navigate('/tableUser')
               toast("Add user success!")
          } catch (error) {
               console.log(error)
          }
     }

     return (
          <div className='form__container' onSubmit={handleSubmit}>
               <form className='form'>
                    <div className="form-group">
                         <label for="exampleInputPassword1">Name</label>
                         <input
                              type="text"
                              className="form-control"
                              id="name"
                              placeholder="Enter your name"
                              onChange={(even) => setInputValue({ ...inputValue, name: even.target.value })}
                         />
                         {validInputName && <span
                              style={{
                                   color: 'red',
                                   display: 'block',
                                   marginBottom: '5px'
                              }}
                         >Enter your name</span>}
                    </div>
                    {/* //////////////////////////////////////////////////////////////// */}
                    <div className="form-group">
                         <label for="exampleInputEmail1">Email address</label>
                         <input
                              type="email"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Enter email"
                              onChange={(even) => setInputValue({ ...inputValue, email: even.target.value })}
                         />
                         {validInputEmail && <span
                              style={{
                                   color: 'red',
                                   display: 'block',
                                   marginBottom: 15
                              }}
                         >Enter your email</span>}

                    </div>
                    <button
                         // type="submit"
                         className="btn btn-primary btn-submit_fromUser"
                    // onClick={() => handleSubmit()}
                    >Add</button>
                    <div className='back'>
                         <NavLink to='/tableUser'><span><FaArrowLeftLong /> Back</span></NavLink>
                    </div>
                    <ToastContainer
                         position="top-right"
                         autoClose={5000}
                         hideProgressBar={false}
                         closeOnClick={true}
                         pauseOnHover={true}
                         draggable={true}
                         progress={undefined}
                         newestOnTop={false}
                         theme="light"
                    />
               </form>
          </div>
     );
}

export default FormAddUser;