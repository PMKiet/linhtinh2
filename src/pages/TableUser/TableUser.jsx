// import react and react router dom
import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
//import scss, icon
import '../../assets/styles/TableUser/TableUser.scss'
import '../../assets/styles/TableUser/searchUser.scss'
import { FaEdit, FaTrash, FaPlus, FaLeaf } from "react-icons/fa";
//import api
import { getAllUser } from '../../services/axios';
import { deleteUser } from '../../services/axios';
//import component
import { toast, ToastContainer } from 'react-toastify';
import FormConfirmAlert from './FormConfirmAlert';


function TableUser(props) {
     let [isShow, setIsShow] = useState(false)
     let [listUser, setListUser] = useState()
     let [activeSeacrh, setActiveSeacrh] = useState(false)
     let [userToDelete, setUserToDelete] = useState(null);
     let [filter, setFilter] = useState('')
     const [filteredUsers, setFilteredUsers] = useState([]);

     useEffect(() => {
          fetchDataUser()
     }, [])

     const fetchDataUser = async () => {
          try {
               const response = await getAllUser()
               setListUser(response.data)
               // setFilteredUsers(response.data)
          } catch (error) {
               console.log('>>>Error from UserList', error);
          }
     }


     const handleSubmitDelete = async () => {
          setIsShow(false);

          try {
               await deleteUser(userToDelete.id);
               console.log('User deleted successfully');
               setUserToDelete(null); // Reset user to delete after deletion
               // fetchDataUser();
               window.location.reload() // Refresh the user list after deletion
               toast("Delete user success!")
          } catch (error) {
               console.error('Error deleting user', error);
          }
     };

     const handleConfirmDelete = (user) => {
          setUserToDelete(user);
          setIsShow(true);
     };

     const handleActiveSeacrh = () => {
          setActiveSeacrh(!activeSeacrh)
     }

     const handleClearValueSearchInput = () => {
          setFilter('')
          setFilteredUsers([])
     }

     const handleFilterChange = (event) => {
          const searchTerm = event.target.value.toLowerCase();
          setFilter(searchTerm)

          // Filter users based on the search term
          const filtered = listUser.filter(user =>
               user.name.toLowerCase().includes(searchTerm) ||
               user.email.toLowerCase().includes(searchTerm)
          );
          setFilteredUsers(filtered)
     }


     return (
          <div>
               <div className="container mt-3">
                    {/* add new user  */}
                    <div className='add-new'>
                         <h2>Dark Striped Table</h2>
                         <p>Add New User: <NavLink
                              to='/createUser'
                              className='btn btn-success'
                         ><FaPlus /> <span>AddNew</span></NavLink></p>
                    </div>
                    {/* add new user end */}

                    {/* search user by name or email */}
                    <div>
                         <div className={`search ${activeSeacrh ? 'active' : ''}`}>
                              <div className='icon' onClick={() => handleActiveSeacrh()}></div>
                              <div className='input'>
                                   <input
                                        type="text"
                                        placeholder='Filter by name or email'
                                        value={filter}
                                        onChange={handleFilterChange}
                                   />
                              </div>
                              {activeSeacrh &&
                                   <span
                                        className='clear'
                                        onClick={() => handleClearValueSearchInput()}
                                   ></span>}
                         </div>
                         <div>
                              {filter && <div>
                                   {filteredUsers.map(user => (
                                        <div>
                                             <li key={user.id}>{user.name} - {user.email}</li>
                                             <td className='optionTable'>
                                                  <NavLink
                                                       to={`/update/${user.id}`}
                                                       className='optionTable__edit'
                                                  ><FaEdit /><span>Edit</span></NavLink>
                                                  <span
                                                       onClick={(even) => handleConfirmDelete(user)}
                                                       className='optionTable__delete'
                                                  > <FaTrash /><span>Delete</span></span>
                                             </td>
                                        </div>
                                   ))}
                              </div>}
                         </div>
                    </div>
                    {/* search user by name or email end */}

                    {/* table user  */}
                    <div className='table_body'>
                         <table className="table table-dark table-striped">
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
                                                       onClick={(even) => handleConfirmDelete(user)}
                                                       className='optionTable__delete'
                                                  > <FaTrash /><span>Delete</span></span>
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                         {/* table user end */}
                    </div>
               </div>
               {isShow &&
                    <FormConfirmAlert
                         setShow={setIsShow}
                         onConfirm={handleSubmitDelete}
                         modalTitle="Delete User"
                         confirmationText={`Are you sure you want to delete ${userToDelete ? userToDelete.name : 'this user'}?`}
                    />}
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
          </div>
     );
}

export default TableUser;