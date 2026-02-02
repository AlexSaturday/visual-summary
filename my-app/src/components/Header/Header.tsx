import React from 'react';
import deerImage from '../../assets/deer.jpg';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header>
            <div className="header__image-container">
                <img src={deerImage} alt="Deer" className="header__image" />
                <div className="header__text">
                    <h1 className='header__title'>Alex Saturday</h1>
                    <p className="header__tagline">
                        - Be better than yesterday
                    </p>
                </div>
            </div>
            <p className="header__description">Это моя личная страница с идеями и проектами.</p>
        </header>
    );
};

export default Header;