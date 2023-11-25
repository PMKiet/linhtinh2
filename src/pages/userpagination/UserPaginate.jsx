import React, { useEffect, useState } from 'react';
//scss
import '../../assets/styles/userpaginate/userPaginate.scss'
import { fetchUsers } from '../../services/axios';
import ReactPaginate from 'react-paginate';
function UserPaginate(props) {
     let [users, setUsers] = useState([])
     const [itemOffset, setItemOffset] = useState(0);
     const [total_page, setTotal_Page] = useState(0)
     useEffect(() => {

          fetchData(1)
     }, [])

     const fetchData = async (page) => {
          try {
               let users = await fetchUsers(page)
               setUsers(users)
               setTotal_Page(users.total_pages)
          } catch (error) {
               console.log(error);
          }
     }
     console.log(users.per_page);

     const handlePageClick = (event) => {
          const newOffset = (event.selected * users.per_page) % users.length;
          fetchData(+event.selected + 1)
          setItemOffset(newOffset);
     };

     return (
          <div className='container'>
               <table id="customers">
                    <tr>
                         <th>First Name</th>
                         <th>Last Name</th>
                         <th>Email</th>
                    </tr>

                    {users.data && users.data.map((user, index) => (
                         <tr key={user.id}>
                              <td>{user.first_name}</td>
                              <td>{user.last_name}</td>
                              <td>{user.email}</td>
                         </tr>
                    ))}

               </table>
               <>
                    <ReactPaginate
                         previousLabel={'previous'}
                         nextLabel={'next'}
                         breakLabel={'...'}
                         pageCount={total_page}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         onPageChange={handlePageClick}
                         containerClassName={'pagination'}
                         subContainerClassName={'pages pagination'}
                         activeClassName={'active'}
                    />
               </>

          </div>
     );
}

export default UserPaginate;