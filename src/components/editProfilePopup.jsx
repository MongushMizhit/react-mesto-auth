import React from 'react';
import PopupWithForm from './popupWithForm';

function EditProfilePopup({isOpen, onClose}) {
    return(
      <PopupWithForm name="popup-profile" title="Редактировать&nbsp;профиль" submitText="Сохранить" isOpen={isOpen} onClose={onClose}>
        <label className="popup__form">
        <input className="popup__input popup__input_type_name" id="name-card" minLength="2" maxLength="40" type="text" name="name" placeholder="Укажите имя" required />
        <span id="name-card-error" className="error"></span>
        <input className="popup__input popup__input_type_job" id="job-card" minLength="2" maxLength="200" type="text" name="info" placeholder="Род деятельности" required />
        <span id="job-card-error" className="error"></span>
    </label>
</PopupWithForm> 
    )
}

export default EditProfilePopup;