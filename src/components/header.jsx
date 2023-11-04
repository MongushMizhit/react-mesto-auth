// src/components/Header.js
import React from 'react';
import headerImage from '../images/header-logo.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={headerImage} alt="Лого" />
    </header>
  );
}

export default Header;
