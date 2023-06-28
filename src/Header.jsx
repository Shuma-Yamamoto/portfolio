import './Header.css';

function Header({ currentPage, switchPage }) {
  const switchTop = () => {
    const newPage = 'Top';
    switchPage(newPage)
  };

  const switchAbout = () => {
    const newPage = 'About';
    switchPage(newPage)
  };

  const switchWorks = () => {
    const newPage = 'Works';
    switchPage(newPage)
  };

  return (
    <>
      <div className='header-container'>
        <p className={`header-item ${currentPage === 'Top' ? 'active' : ''}`} onClick={switchTop}>Top</p>
        <p className={`header-item ${currentPage === 'About' ? 'active' : ''}`} onClick={switchAbout}>About</p>
        <p className={`header-item ${currentPage === 'Works' ? 'active' : ''}`} onClick={switchWorks}>Works</p>
      </div>
    </>
  )
}

export default Header;
