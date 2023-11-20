import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import { api } from './utils/Api';
import './index.css'; 
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import EditProfilePopup from './components/editProfilePopup';
import AddPlacePopup from './components/addPlacePopup';
import EditAvatarPopup from './components/editAvatarPopup';
import DeletePopup from './components/deletePopup';
import ImagePopup from './components/imagePopup';

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Получаем данные пользователя при монтировании компонента
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных пользователя:', error);
      });
  }, []);

  const handleUpdateUser = (newUserData) => {
    // Отправляем данные пользователя на сервер
    api.updateProfileInfo(newUserData.name, newUserData.about)
      .then((userData) => {
        // Обновляем стейт currentUser
        setCurrentUser(userData);
        // Закрываем попап
        closeAllPopups()
      })
      .catch((error) => {
        console.error('Ошибка при обновлении данных пользователя:', error);
      });
  };

  const handleUpdateAvatar = (newAvatar) => {
    // Отправляем данные обновленного аватара на сервер
    api.updateAvatar(newAvatar.avatar)
      .then((updatedUserData) => {
        // Обновляем стейт currentUser
        setCurrentUser(updatedUserData);
        // Закрываем попап
        closeAllPopups();
      })
      .catch((error) => {
        console.error('Ошибка при обновлении аватара:', error);
      });
  };

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке карточек:', error);
      });
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.error('Ошибка при изменении статуса лайка:', error);
      });
  };

  const onDeleteConfirm = () => {
    api.deleteCard(selectedDeleteCard)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== selectedDeleteCard));
        closeAllPopups();
      })
      .catch((error) => {
        console.error('Ошибка при удалении карточки:', error);
      });
  };

  const handleAddPlaceSubmit = (newCardData) => {
    api.addCard(newCardData.name, newCardData.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.error('Ошибка при добавлении новой карточки:', error);
      });
  };
  
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedDeleteCard, setSelectedDeleteCard] = useState(null);

  
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardDelete = (card) => {
    setDeletePopupOpen(true);
    setSelectedDeleteCard(card)
  }

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeletePopupOpen(false);
    setSelectedCard(null);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Main 
        cards={cards}
        onEditAvatarClick={handleEditAvatarClick}
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onDeleteClick={handleCardDelete}
      />
      <Footer />

  <EditProfilePopup
    isOpen={isEditProfilePopupOpen}
    onClose={closeAllPopups}
    onUpdateUser={handleUpdateUser}
  >
  </EditProfilePopup>

  <AddPlacePopup
    isOpen={isAddPlacePopupOpen}
    onClose={closeAllPopups}
    onAddPlaceSubmit={handleAddPlaceSubmit}
  >
  </AddPlacePopup>

      
  <ImagePopup
    card={selectedCard}
    onClose={closeAllPopups}
  />

      <DeletePopup
      isOpen={isDeletePopupOpen}
      onClose={closeAllPopups}
      onDeleteConfirm={onDeleteConfirm}
    >
    </DeletePopup>
     
      <EditAvatarPopup
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      onUpdateAvatar={handleUpdateAvatar}
    >
    </EditAvatarPopup>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;