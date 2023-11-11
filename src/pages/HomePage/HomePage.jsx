import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../assets/styles/Post/Post.scss'
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';

function HomePage(props) {

     let [dataBlog, setDataBlog] = useState('')
     let [isLoading, setIsLoading] = useState(false)

     useEffect(() => {
          fetchAllData()
     }, [])

     const fetchAllData = async () => {
          setIsLoading(true)

          await axios.get('https://jsonplaceholder.typicode.com/posts')
               .then(response => {
                    setDataBlog(response.data.slice(0, 10))
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
                              <div className='col-3 '>
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