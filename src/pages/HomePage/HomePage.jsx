import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/Post/Post.scss'
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import { fetchDataLogs } from '../../services/axios';

function HomePage(props) {

     let [dataBlog, setDataBlog] = useState('')
     let [isLoading, setIsLoading] = useState(false)

     useEffect(() => {
          getDataLogs()
     }, [])

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

     return (
          <div className='container'>
               {isLoading === true ? <LoadingScreen /> :
                    <div className='row post-list'>
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
          </div>
     );
}

export default HomePage;