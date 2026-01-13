import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navItems = [
    { href: '/', label: 'Главная' },
    { href: '/category/politics', label: 'Политика' },
    { href: '/category/economy', label: 'Экономика' },
    { href: '/category/sport', label: 'Спорт' },
    { href: '/category/culture', label: 'Культура' },
  ];

  return (
    <>
      <header 
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <div className="container">
          <div className={styles.navbar}>
            <Link 
              href="/" 
              className={styles.logo}
              aria-label="Новости России - переход на главную"
            >
              <span className={styles.logoIcon}>🇷🇺</span>
              <span className={styles.logoText}>Новости России</span>
            </Link>

            <nav className={styles.desktopNav} aria-label="Основная навигация">
              <ul className={styles.navList}>
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className={styles.navLink}
                      prefetch={false}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              className={`${styles.mobileMenuButton} ${isMenuOpen ? styles.active : ''}`}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className={styles.menuLine}></span>
              <span className={styles.menuLine}></span>
              <span className={styles.menuLine}></span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={closeMenu} 
        id="mobile-menu"
      />
    </>
  );
}