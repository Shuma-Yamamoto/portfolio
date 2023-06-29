import './App.css';
import Header from './Header';
import Top from './Top';
import About from './About';
import Works from './Works';
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('Top');

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

  return (
    <>
      <div className={`page-fade-in`}>
        <Header currentPage={currentPage} switchPage={switchPage} />
        {renderPage()}
      </div>
    </>
  );
}

export default App;
