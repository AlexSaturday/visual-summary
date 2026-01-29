import React from 'react';
import './Links.css';

export type LinksItem = {
    id: number;
    url: string;
    name: string;
};

type LinksProps = {
    links: LinksItem[];
    variant?: 'default' | 'footer';
};


const Links: React.FC<LinksProps> = ({links, variant = 'default'}:LinksProps) => {
    return (
        <ul className={`links links--${variant}`}>
            <h2 className='links__title'>Здесь будут мои ссылки</h2>
            {links.map((link) => (
                <li key={link.id} className="links__item">
                    <a href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="links__link"
                    >
                        {link.name}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default Links;