import React, { useEffect, useState } from 'react';
import '../../assets/styles/TableUser/TableUser.scss'
import { FaEdit, FaTrash, FaPlus, FaLeaf } from "react-icons/fa";
import { getAllUser } from '../../services/axios';
import { NavLink, Link } from 'react-router-dom';
import { deleteUser } from '../../services/axios';
import { useNavigate } from 'react-router-dom';

function TableUser(props) {
     let [listUser, setListUser] = useState()
     useEffect(() => {
          fetchDataUser()
     }, [])

     const fetchDataUser = async () => {
          try {
               const response = await getAllUser()
               setListUser(response.data)
          } catch (error) {
               console.log('>>>Error from UserList', error);
          }
     }

     const handleDelete = async (user) => {
          const confirm = window.confirm('Do you want to delete: ' + user.name)
          if (confirm) {
               // console.log(name);
               await deleteUser(user.id)
                    .then(response => {
                         alert('has delete user')
                         window.location.reload();
                    }).catch(err => console.log(err))
          }
     }

     return (
          <div>
               <div class="container mt-3">
                    <h2>Dark Striped Table</h2>
                    <p>Add New User: <NavLink
                         to='/createUser'
                         className='btn btn-success'
                    ><FaPlus /> <span>AddNew</span></NavLink></p>

                    <div className='table_body'>
                         <table class="table table-dark table-striped">
                              <thead>
                                   <tr>
                                        <th>User name </th>
                                        <th>Email</th>
                                        <th>Option</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {listUser && listUser.map((user, index) => (
                                        <tr key={user.id}>
                                             <td>{user.name}</td>
                                             <td>{user.email}</td>
                                             <td className='optionTable'>
                                                  <NavLink
                                                       to={`/update/${user.id}`}
                                                       className='optionTable__edit'
                                                  ><FaEdit /><span>Edit</span></NavLink>
                                                  <span
                                                       onClick={(even) => handleDelete(user)}
                                                       className='optionTable__delete'
                                                  > <FaTrash /><span>Delete</span></span>
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               </div>
               {/* from add*/}
          </div>
     );
}

export default TableUser;