import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import '../../assets/styles/Post/Post.scss'
import { Link } from 'react-router-dom';

function DetaileBlog(props) {
     let { id } = useParams()
     let [isLoading, setIsLoading] = useState(false)
     let [detaiDataLog, setDetaiDataLog] = useState('')


     useEffect(() => {
          fetchAllData()
     }, [])

     const fetchAllData = async () => {
          setIsLoading(true)

          await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
               .then(response => {
                    setDetaiDataLog(response.data)
               })
               .catch(error => {
                    console.error('Lỗi:', error);
               });
          setIsLoading(false)

     }

     return (
          <div>
               {isLoading ? <LoadingScreen /> :
                    <div className='detai'>
                         <h1>{detaiDataLog.title}</h1>
                         <p>{detaiDataLog.body}</p>
                         <button className='button btn'>
                              <Link className='btn btn-primary ' to={`/`}>
                                   Back
                              </Link>
                         </button>
                    </div>
               }
          </div>
     );
}

export default DetaileBlog;