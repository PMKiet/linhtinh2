import React from 'react';
import '../../assets/styles/TableUser/FormConfirmAlert.scss';
import { IoCloseCircleOutline } from 'react-icons/io5';

function FormConfirmAlert({ setShow, onConfirm, modalTitle, confirmationText }) {
     const handleOnClickDeleteUser = () => {
          onConfirm();
          setShow(false);
     };

     const handleClose = () => {
          setShow(false);
     };

     return (
          <div className="confirm" onClick={handleClose}>
               <div className="confirm__container" onClick={(e) => e.stopPropagation()}>
                    <h3 className="confirm__title">
                         {modalTitle || 'Confirm Action'}
                         <span onClick={handleClose}>
                              <IoCloseCircleOutline />
                         </span>
                    </h3>
                    <span className="confirm__text">{confirmationText || 'Are you sure?'}</span>
                    <div className="group__button">
                         <button className="btn btn-secondary" onClick={handleClose}>
                              Close
                         </button>
                         <button className="btn btn-danger" onClick={handleOnClickDeleteUser}>
                              Delete
                         </button>
                    </div>
               </div>
          </div>
     );
}

export default FormConfirmAlert;   