import React, { useState, useEffect } from 'react';
import { api } from '../utils/Api';
import avatarImage from '../images/pascal.jpg';
import Card from './card';

function Main(props) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState(avatarImage);
  const [cards, setCards] = useState([]);

  
  useEffect(() => {
    
    api.getUserInfo()
      .then((userData) => {
        
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных пользователя:', error);
      });
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке карточек:', error);
      });
  }, []);
  
  
  return (
    <main className="main">
      <section className="profile">
          <div className="profile__avatar-container">
            <img className="profile__avatar-image" style={{ backgroundImage: `url(${userAvatar})` }} alt="аватар" />
            <button className="profile__avatar-edit" type="button" onClick={props.onEditAvatarClick}></button>
          </div>
          <div className="profile__info">
            <div className="profile__info-container">
              <h1 className="profile__nickname">{userName}</h1>
              <p className="profile__description">{userDescription}</p>
            </div>
            <button className="profile__edit-button profile__button-opened" type="button" onClick={props.onEditProfileClick}></button>
          </div>
          <button className="profile__add-button" type="button" onClick={props.onAddPlaceClick}></button>
        </section>

        <section className="elements">
          
  {cards.map((card) => (
    <Card key={card._id} card={card} onCardClick={props.onCardClick}/>
  ))}
</section>
    </main>
  );
}

export default Main;
