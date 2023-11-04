import React, { useState } from 'react';
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
  
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);


  
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleDeletePopupClick = () => {
    setDeletePopupOpen(true);
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
    <div className="page">
      <Header />
      <Main 
        onEditAvatarClick={handleEditAvatarClick}
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onDeletePopupClick={handleDeletePopupClick}
        onCardClick={handleCardClick}
      />
      <Footer />

  <EditProfilePopup
    isOpen={isEditProfilePopupOpen}
    onClose={closeAllPopups}
  >
  </EditProfilePopup>

  <AddPlacePopup
    isOpen={isAddPlacePopupOpen}
    onClose={closeAllPopups}
  >
  </AddPlacePopup>

      
  <ImagePopup
    card={selectedCard}
    onClose={closeAllPopups}
  />

      <DeletePopup
      isOpen={isDeletePopupOpen}
      onClose={closeAllPopups}
    >
    </DeletePopup>
     
      <EditAvatarPopup
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
    >
    </EditAvatarPopup>
    </div>
  );
}

export default App;