import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaEdit, FaTrash } from "react-icons/fa";
import '../../assets/styles/TableUser/userfilter.scss'

function SearchUser({ listUser, conFirmDelete }) {
     let [activeSeacrh, setActiveSeacrh] = useState(false)
     let [filter, setFilter] = useState('')
     const [filteredUsers, setFilteredUsers] = useState([]);


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
               <div className={`search ${activeSeacrh ? 'active' : ''}`}>
                    <div>
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
               </div>
               {filter && <div className='userFilter__container'>
                    {filter && <div>
                         {filteredUsers.map(user => (
                              <div className='list__user--filter'>
                                   <span className='user' key={user.id}>{user.name} - {user.email}</span>
                                   <div className='optionTable'>
                                        <NavLink
                                             to={`/update/${user.id}`}
                                             className='optionTable__edit'
                                        ><FaEdit /><span>Edit</span></NavLink>
                                        <span
                                             onClick={(even) => conFirmDelete(user)}
                                             className='optionTable__delete'
                                        > <FaTrash /><span>Delete</span></span>
                                   </div>
                              </div>
                         ))}
                    </div>}
               </div>}
          </div>
     );
}

export default SearchUser;