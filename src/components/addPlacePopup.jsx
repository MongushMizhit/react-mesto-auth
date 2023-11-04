import React from 'react';
import PopupWithForm from './popupWithForm';

function AddPlacePopup({isOpen, onClose}) {
    return(
      <PopupWithForm name="card-popup" title="Новое&nbsp;место" submitText="Создать" isOpen={isOpen} onClose={onClose}>
          <label className="popup__form" id="card-popup__form" name="add-form" noValidate>
            <input className="popup__input popup__input_type_title" id="title-card" minLength="2" maxLength="30" type="text" name="name" placeholder="Название" required />
            <span id="title-card-error" className="error"></span>
            <input className="popup__input popup__input_type_link" id="link-card" type="url" name="link" placeholder="Ссылка на картинку" required />
            <span id="link-card-error" className="error"></span>
          </label>
</PopupWithForm> 
    )
}

export default AddPlacePopup;