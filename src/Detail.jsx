import { useState, useEffect } from 'react';
import './Detail.css';

const Detail = ({ workState, workIndex, slides, closeModal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide === (slides.length - 1)) {
      null;
    } else {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      null;
    } else {
      setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      nextSlide();
    } else if (event.key === 'ArrowLeft') {
      prevSlide();
    }
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, [workState]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide]);

  return (
    <div className="work-modal">
      <div className="work-overlay" onClick={closeModal} />
      <div className="work-content">
        <button className="work-close-button" onClick={closeModal}>×</button>
        <div className="work-slides">
          {slides.map((slide, index) => (
            <a
              key={index}
              href={workIndex === 1 && currentSlide === 2 ? 'https://play.google.com/store/apps/details?id=com.shuma_yamamoto.utatrain' : undefined}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={slide}
                className={index === currentSlide ? 'active' : ''}
              />
            </a>
          ))}
        </div>
        <div className="work-pagination">
          {slides.map((_, index) => (
            <span
              key={index}
              className={index === currentSlide ? 'active' : ''}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
