import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './login'
import ProtectedRoute from './protectedRoute';
import Register from './register';
import InfoTooltip from './infoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';
import * as authApi from "../utils/authApi"; 
import Header from './header';
import Main from './main';
import Footer from './footer';
import EditProfilePopup from './editProfilePopup';
import AddPlacePopup from './addPlacePopup';
import EditAvatarPopup from './editAvatarPopup';
import DeletePopup from './deletePopup';
import ImagePopup from './imagePopup';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedDeleteCard, setSelectedDeleteCard] = useState(null);
  const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [isProfileEmail, setIsProfileEmail] = useState('email');
  const [cards, setCards] = useState([]);

  const auth = (jwt) => {
    return authApi.checkToken(jwt)
      .then((res) => {
        console.log('Ответ от сервера при проверке токена:', res);
        if (res) {
          setLoggedIn(true);
          setIsProfileEmail(res.data.email);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error('Ошибка при проверке токена:', error);
      });
  };
  
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    auth(jwt);
  }, []);

  useEffect(() => {
    
    if (loggedIn) {
      api.getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((error) => {
          console.error('Ошибка при загрузке карточек:', error);
        });
    }
  }, [loggedIn]);
 
  const handleLogin = ({ email, password }) => {
    authApi.login(email, password)
      .then((res) => {
        if (res) {
          setIsProfileEmail(email);  
        }
        setLoggedIn(true);
        navigate("/");
        return res;
      })
      .catch((error) => {
        console.error('Ошибка при входе:', error);
        openInfoTooltipPopup(false);
      });
  };
  
const handleRegister = ({email, password}) => {
  authApi.register(email, password)
  .then((res) => {
    if (res.jwt) {
      setLoggedIn(true);
    }
    openInfoTooltipPopup(true);
    navigate('/sign-in');
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
    openInfoTooltipPopup(false);
  })
}


const logOut = () => {
  setLoggedIn(false);
  setCurrentUser();
  localStorage.removeItem("jwt");
}

  useEffect(() => {
    // Получаем данные пользователя при монтировании компонента
    if (loggedIn) {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных пользователя:', error);
      });
    }
  }, [loggedIn]);

  

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

  const openInfoTooltipPopup = (isSignIn) => {
    setIsInfoTooltipPopup(true);
    setIsSignIn(isSignIn);
}

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeletePopupOpen(false);
    setIsInfoTooltipPopup(false);
    setSelectedCard(null);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header 
        loggedIn={loggedIn}
        logOut={logOut}
        isProfileEmail={isProfileEmail}
      />
       <Routes>
       <Route
        path="/"
        element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={Main}
              cards={cards}
              onEditAvatarClick={handleEditAvatarClick}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onDeleteClick={handleCardDelete}
            />
        }
      />
      <Route
        path="sign-up"
        element={<Register onRegister={handleRegister} />}
      />
      <Route
        path="sign-in"
        element={<Login onLogin={handleLogin} />}
      />
    </Routes>
      <Footer loggedIn={loggedIn} />

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

    <InfoTooltip
      isOpen={isInfoTooltipPopup}
      onClose={closeAllPopups}
      isSignIn={isSignIn}
      />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;