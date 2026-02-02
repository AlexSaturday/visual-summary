import React from 'react';
import './About.css';

const About: React.FC = () => {
    return (
        <section className="about">
            <h2 className="about__title">
                О чем эта страница?
            </h2>
            <p className="about__description">
                Здесь я собираю свои эксперименты, небольшие программы и идеи,
                которые мне интересно развивать.
            </p>
        </section>
    );
};

export default About;