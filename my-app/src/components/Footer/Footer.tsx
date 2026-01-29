import React from 'react';
import './Footer.css';
import Links from '../Links/Links';
import { links } from '../../data/links';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <Links links={links} />
            <div className="footer-content">
                <p>© {new Date().getFullYear()} All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;