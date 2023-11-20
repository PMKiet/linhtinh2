import React, { useEffect, useState } from 'react';
import { getOneUser, editUser } from '../../services/axios';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import NotFound from '../../components/notFound/NotFound';
import '../../assets/styles/TableUser/formAddUser.scss'
import { FaArrowLeftLong } from "react-icons/fa6";


function FormEditUser(props) {
     let { id } = useParams()
     let [dataUserById, setDataUserById] = useState([{ name: '', email: '' }])
     let navigate = useNavigate()

     useEffect(() => {
          fetchDataUserById()
     }, [])

     const fetchDataUserById = async () => {
          try {
               const res = await getOneUser(id)
               if (!res) {
                    <NotFound />
               } else {
                    setDataUserById(res.data)
               }
          } catch (error) {
               console.log(error);
          }
     }

     const handleSubmit = async (even) => {
          even.preventDefault()
          await editUser(id, dataUserById)
          try {
               alert('Update user success!')
               navigate('/tableUser')
          } catch (error) {
               console.log(error);
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
                              value={dataUserById.name}
                              onChange={(even) => setDataUserById({ ...dataUserById, name: even.target.value })}
                         />
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
                              value={dataUserById.email}
                              onChange={(even) => setDataUserById({ ...dataUserById, email: even.target.value })}

                         />
                    </div>
                    <button
                         className="btn btn-primary btn-submit_fromUser"
                    >Submit</button>
                    <div className='back'>
                         <NavLink to='/tableUser'><span><FaArrowLeftLong /> Back</span></NavLink>
                    </div>
               </form>
          </div>
     );
}

export default FormEditUser;