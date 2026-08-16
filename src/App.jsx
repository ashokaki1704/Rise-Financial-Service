import React from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Why from './components/Why.jsx';
import Services from './components/Services.jsx';
import Process from './components/Process.jsx';
import Network from './components/Network.jsx';
import Apply from './components/Apply.jsx';
import Footer from './components/Footer.jsx';
import FloatingButtons from './components/FloatingButtons.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Why />
        <Services />
        <Process />
        <Network />
        <Apply />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
