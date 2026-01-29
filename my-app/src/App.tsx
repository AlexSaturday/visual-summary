import React from 'react';
import './App.css';
import About from './components/About/About';
import Header from './components/Header/Header';
import Links from './components/Links/Links';
import Projects from './components/Projects/Projects';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <main className='app'>
      <Header />
      <About />
      <Projects />
      <Footer />
    </main>
  );
}

export default App;
