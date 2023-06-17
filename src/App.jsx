import './App.css';
import Header from './Header';
import Top from './Top';
import About from './About';
import Works from './Works';
import { useState, useEffect } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState(localStorage.getItem('currentPage') || 'Top');

  const renderPage = () => {
    if (currentPage === 'Top') {
      return <Top />;
    } else if (currentPage === 'About') {
      return <About />;
    } else if (currentPage === 'Works') {
      return <Works />;
    }
  };

  const switchPage = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  return (
    <>
      <Header currentPage={currentPage} switchPage={switchPage} />
      {renderPage()}
    </>
  );
}

export default App;
