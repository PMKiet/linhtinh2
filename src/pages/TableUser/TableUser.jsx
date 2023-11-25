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
import SearchUser from './searchUser';
import FormAddUser from './formAddUser';
import FormEditUser from './formEditUser';


function TableUser(props) {
     let [isShow, setIsShow] = useState(false)
     let [isShowAddUser, setIsShowAddUser] = useState(false)
     let [isShowEditUser, setIsShowEditUser] = useState(false)
     let [listUser, setListUser] = useState()
     let [userToDelete, setUserToDelete] = useState(null);
     //sort user
     let [sortBy, setSortBy] = useState('name') //mặc định sắp xếp theo tên
     let [sortOrder, setSortOrder] = useState('name') //mặc định sắp xếp theo thứ tự

     useEffect(() => {
          fetchDataUser()
     }, [sortBy, sortOrder])

     const fetchDataUser = async () => {
          try {
               const response = await getAllUser()
               setListUser(response.data)
               //dataSort
               let sortedUser = [...response.data]
               //sắp xếp danh sách người dùng theo trạng thái hiện tại
               sortedUser.sort((a, b) => {
                    const order = sortOrder === 'asc' ? 1 : -1
                    return a[sortBy].localeCompare(b[sortBy]) * order
               })

               setListUser(sortedUser)

               // setFilteredUsers(response.data)
          } catch (error) {
               console.log('>>>Error from UserList', error);
          }
     }

     const handleSort = (field) => {
          // nếu trường hiện tại giống với trường được nhấp, đảo ngược thứ tự; ngược lại, sắp xếp theo thứ tự tăng dần
          setSortOrder(sortBy === field ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc')
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


     return (
          <div>
               <div className="container mt-3">
                    {/* add new user  */}
                    <div className='add-new'>
                         <h2>Dark Striped Table</h2>
                         <p>Add New User: <NavLink
                              onClick={() => setIsShowAddUser(true)}
                              className='btn btn-success'
                         ><FaPlus /> <span>AddNew</span></NavLink></p>
                    </div>
                    {/* add new user end */}

                    {/* search user by name or email */}
                    <SearchUser
                         listUser={listUser}
                         conFirmDelete={handleConfirmDelete}
                    />
                    {/* search user by name or email end */}

                    {/* table user  */}
                    <div className='table_body'>
                         <table className="table table-dark table-striped">
                              <thead>
                                   <tr>
                                        <th onClick={() => handleSort('name')}>
                                             User name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                                        </th>
                                        <th onClick={() => handleSort('email')}>
                                             Email {sortBy === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
                                        </th>
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
                                                       // onClick={() => setIsShowEditUser(true)}
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
               {isShowAddUser && <FormAddUser
                    setIsShowAddUser={setIsShowAddUser}
               />}
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