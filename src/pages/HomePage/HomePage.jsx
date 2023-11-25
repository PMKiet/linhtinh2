import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Post/Post.scss'
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import { fetchDataLogs } from '../../services/axios';
import Pagination from '../../components/Pagination/Pagination';

function HomePage(props) {
     let [dataBlog, setDataBlog] = useState('')
     let [isLoading, setIsLoading] = useState(false)
     let [currentPage, setCurrenPage] = useState(1)
     // const [currentPage, setCurrentPage] = useState(1);
     let [blogsPerPage] = useState(5)
     const [pageNumber, setPageNumber] = useState(1);
     const [pageNumbers, setPageNumbers] = useState([]);

     useEffect(() => {
          getDataLogs()
     }, [])

     useEffect(() => {
          const numbers = [];
          for (let i = 1; i <= Math.ceil(dataBlog.length / blogsPerPage); i++) {
               numbers.push(i);
          }
          setPageNumbers(numbers);
     }, [dataBlog.length, blogsPerPage]);

     const handlePaginate = (number) => {
          setPageNumber(number);
          paginate(number);
     };
     const getDataLogs = async () => {
          setIsLoading(true)

          await fetchDataLogs()
               .then(dataLogs => {
                    setDataBlog(dataLogs.slice(0, 50))
               })
               .catch(error => {
                    console.error('Lỗi:', error);
               });

          setIsLoading(false)
     }

     const indexOfLastBlog = currentPage * blogsPerPage
     const indexOfFirstBlog = indexOfLastBlog - blogsPerPage
     const curentBlogs = dataBlog.slice(indexOfFirstBlog, indexOfLastBlog)

     const paginate = (pageNumber) => setCurrenPage(pageNumber);

     return (
          <div className='container '>
               {isLoading === true ? <LoadingScreen /> :
                    <div className='row post-list pt-5'>
                         {dataBlog && dataBlog.length > 0 && dataBlog.map(item => (
                              <div className='col-12 col-sm-3'>
                                   <div className='card-post'>
                                        <h5 className='title'>Title: {item.title}</h5>
                                        <div className='content'>{item.body}</div>
                                        <button className='button btn'>
                                             <Link className='btn btn-primary btn-lgn' to={`/home/${item.id}`}>
                                                  Detail
                                             </Link>
                                        </button>
                                   </div>
                              </div>
                         ))}
                    </div>
               }
               {/* Sử dụng component Pagination */}
               <div className="pagination">
                    {pageNumbers.map((number) => (
                         <div key={number} className={`page-item ${pageNumber === number ? 'active' : ''}`}>
                              <button onClick={() => handlePaginate(number)} className="page-link">
                                   {number}
                              </button>
                         </div>
                    ))}
               </div>

          </div>
     );
}

export default HomePage;