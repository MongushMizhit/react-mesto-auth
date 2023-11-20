import React from 'react';
import PopupWithForm from './popupWithForm';

function DeletePopup({isOpen, onClose, onDeleteConfirm}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onDeleteConfirm();
      };

    return(
      <PopupWithForm name="delete-popup" title="Вы&nbsp;уверены?" submitText="Да" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isDeleteForm={true}>
</PopupWithForm> 
    )
}

export default DeletePopup;