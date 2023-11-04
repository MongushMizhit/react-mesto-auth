import React from 'react';
import PopupWithForm from './popupWithForm';

function DeletePopup({isOpen, onClose}) {
    return(
      <PopupWithForm name="delete-popup" title="Вы&nbsp;уверены?" submitText="Да" isOpen={isOpen} onClose={onClose}>
</PopupWithForm> 
    )
}

export default DeletePopup;