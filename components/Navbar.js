import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className="container">
          <div className={styles.navbar}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>🇷🇺</span>
              <span className={styles.logoText}>Новости России</span>
            </Link>

            <nav className={styles.desktopNav}>
              <ul className={styles.navList}>
                <li><Link href="/" className={styles.navLink}>Главная</Link></li>
                <li><Link href="/category/politics" className={styles.navLink}>Политика</Link></li>
                <li><Link href="/category/economy" className={styles.navLink}>Экономика</Link></li>
                <li><Link href="/category/sport" className={styles.navLink}>Спорт</Link></li>
                <li><Link href="/category/culture" className={styles.navLink}>Культура</Link></li>
              </ul>
            </nav>

            <button
              className={`${styles.mobileMenuButton} ${isMenuOpen ? styles.active : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Меню"
            >
              <span className={styles.menuLine}></span>
              <span className={styles.menuLine}></span>
              <span className={styles.menuLine}></span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

function MobileMenu({ isOpen, onClose }) {
  const menuItems = [
    { href: '/', label: 'Главная', icon: '🏠' },
    { href: '/category/politics', label: 'Политика', icon: '⚖️' },
    { href: '/category/economy', label: 'Экономика', icon: '📈' },
    { href: '/category/sport', label: 'Спорт', icon: '⚽' },
    { href: '/category/culture', label: 'Культура', icon: '🎭' },
    { href: '/category/science', label: 'Наука', icon: '🔬' },
    { href: '/category/technology', label: 'Технологии', icon: '💻' },
    { href: '/about', label: 'О нас', icon: 'ℹ️' },
    { href: '/contacts', label: 'Контакты', icon: '📞' },
  ];

  return (
    <>
      <div className={`${styles.menuOverlay} ${isOpen ? styles.visible : ''}`} onClick={onClose} />
      
      <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuHeader}>
          <h3 className={styles.mobileMenuTitle}>Меню</h3>
          <button
            className={styles.mobileMenuClose}
            onClick={onClose}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            {menuItems.map((item) => (
              <li key={item.href} className={styles.mobileNavItem}>
                <Link href={item.href} className={styles.mobileNavLink} onClick={onClose}>
                  <span className={styles.mobileNavIcon}>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.mobileMenuFooter}>
          <div className={styles.mobileContacts}>
            <p>Свяжитесь с нами:</p>
            <a href="mailto:news@russia.ru" className={styles.mobileContactLink}>
              news@russia.ru
            </a>
            <a href="tel:+78001234567" className={styles.mobileContactLink}>
              8 (800) 123-45-67
            </a>
          </div>
        </div>
      </div>
    </>
  );
}