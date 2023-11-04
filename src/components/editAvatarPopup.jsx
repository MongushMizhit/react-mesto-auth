import React from 'react';
import PopupWithForm from './popupWithForm';

function EditAvatarPopup({isOpen, onClose}) {
    return(
      <PopupWithForm name="avatar-popup" title="Обновить&nbsp;аватар" submitText="Сохранить" isOpen={isOpen} onClose={onClose}>
          <label className="popup__form popup__form-avatar" id="avatar-popup__form" name="avatar-form" noValidate>
            <label htmlFor="avatar-input" className="popup__label">
              <input className="popup__input popup__input-avatar" id="avatar-card" type="url" name="nickname" placeholder="Ссылка на изображение" required />
              <span id="avatar-card-error" className="error"></span>
            </label>
          </label>
</PopupWithForm> 
    )
}

export default EditAvatarPopup;