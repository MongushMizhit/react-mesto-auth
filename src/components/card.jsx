import React from 'react';

function Card({ card, onCardClick }) { 

    function handleCardClick() {
      onCardClick(card); 
    }
      

  return (
    <article className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleCardClick}
      />
      <button className="element__delete-button" type="button"></button>
      <div className="element__info-container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button className="element__like-button" type="button"></button>
          <p className="element__like-number">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
