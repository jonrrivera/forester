import React, { useState, useEffect } from 'react';
import styles from './NavBar.module.scss';

function NavBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [disableScrollFade, setDisableScrollFade] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      if (disableScrollFade) return; 

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [disableScrollFade]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigationClick = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.querySelector(targetId);
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - (window.innerHeight / 2) + (targetElement.offsetHeight / 2);

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    setDisableScrollFade(true);
    setIsVisible(true);

    if (isMobile) {
      setIsMenuOpen(false);
    }

    targetElement.classList.add(styles.focused);

    setTimeout(() => setDisableScrollFade(false), 2000);
  };

  return (
    <div className={`${styles.NavBar} ${!isVisible ? styles.hidden : ''}`}>
      <div className={styles.NavBarContainer}>
        {isMobile ? (
          <div className={styles.Hamburger} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <ul className={styles.NavList}>
            <a href="#tour" onClick={(e) => handleNavigationClick(e, '#tour')}><li>TOUR</li></a>
            <a href="#newmusic" onClick={(e) => handleNavigationClick(e, '#newmusic')}><li>MUSIC</li></a>
            <a href="#store" onClick={(e) => handleNavigationClick(e, '#store')}><li>STORE</li></a>
            <a href="#videos" onClick={(e) => handleNavigationClick(e, '#videos')}><li>VIDEOS</li></a>
            <a href="#mission" onClick={(e) => handleNavigationClick(e, '#mission')}><li>MISSION</li></a>
          </ul>
        )}
      </div>
      {isMobile && isMenuOpen && (
        <div className={styles.MobileMenu}>
          <ul className={styles.MobileNavList}>
            <a href="#tour" onClick={(e) => handleNavigationClick(e, '#tour')}><li>TOUR</li></a>
            <a href="#newmusic" onClick={(e) => handleNavigationClick(e, '#newmusic')}><li>NEW MUSIC</li></a>
            <a href="#store" onClick={(e) => handleNavigationClick(e, '#store')}><li>STORE</li></a>
            <a href="#videos" onClick={(e) => handleNavigationClick(e, '#videos')}><li>VIDEOS</li></a>
            <a href="#mission" onClick={(e) => handleNavigationClick(e, '#mission')}><li>OUR MISSION</li></a>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavBar;
