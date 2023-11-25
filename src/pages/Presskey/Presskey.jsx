import React, { useState, useEffect } from 'react';
import '../../assets/styles/Presskey/Presskey.scss'

function Presskey(props) {
     let [show, setShow] = useState(true)
     let [which, setWhich] = useState(1)
     let [key, setKey] = useState(1)
     let [location, setLocation] = useState(1)
     let [code, setCode] = useState(1)
     const handleKeyPress = (e) => {
          setShow(false)
          setWhich(e.keyCode);
          setLocation(e.location)
          setKey(e.key)
          setCode(e.code)
     };

     useEffect(() => {
          // Add event listener when the component mounts
          document.addEventListener('keydown', handleKeyPress);

          // Remove event listener when the component unmounts
          return () => {
               document.removeEventListener('keydown', handleKeyPress);
          };
     }, []);

     return (
          <div className='bg-pressKey'>
               <div className={`box ${show ? '' : 'hide'}`}>Press AnyKey</div>
               <div className={`container ${show ? 'hide' : ''}`}>
                    <div className='result'>89</div>
                    <div className='detail'>
                         <div className="card key">
                              <p>Key</p>
                              <p>{key}</p>
                         </div>
                         <div className="card location">
                              <p>Location</p>
                              <p>{location}</p>
                         </div>
                         <div className="card which">
                              <p>Which</p>
                              <p>{which}</p>
                         </div>
                         <div className="card code">
                              <p>Code</p>
                              <p>{code}</p>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default Presskey;