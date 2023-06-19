import './App.css';
import Header from './Header';
import Top from './Top';
import About from './About';
import Works from './Works';
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('Top');
  const [isFadeIn, setIsFadeIn] = useState(false);

  const renderPage = () => {
    if (currentPage === 'Top') {
      return <Top isFadeIn={isFadeIn} />;
    } else if (currentPage === 'About') {
      return <About isFadeIn={isFadeIn} />;
    } else if (currentPage === 'Works') {
      return <Works isFadeIn={isFadeIn} />;
    }
  };

  const switchPage = (newPage) => {
    setIsFadeIn(true);
    setCurrentPage(newPage);
    setTimeout(() => {
      setIsFadeIn(false);
    }, 1000);
  };

  return (
    <>
      <div className={`page ${isFadeIn ? 'page-fade-in' : ''}`}>
        <div className={`page-fade-in`}>
          <Header currentPage={currentPage} switchPage={switchPage} />
          {renderPage()}
        </div>
      </div>
    </>
  );
}

export default App;
