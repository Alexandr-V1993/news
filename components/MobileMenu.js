import { useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function MobileMenu({ isOpen, onClose }) {
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

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className={`${styles.menuOverlay} ${isOpen ? styles.visible : ''}`} 
        onClick={onClose} 
        role="button"
        tabIndex={0}
        aria-label="Закрыть меню"
      />
      
      <div 
        className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Мобильное меню"
      >
        <div className={styles.mobileMenuHeader}>
          <h3 className={styles.mobileMenuTitle}>Меню</h3>
          <button
            className={styles.mobileMenuClose}
            onClick={onClose}
            aria-label="Закрыть меню"
          >
            ✕
          </button>
        </div>

        <nav className={styles.mobileNav} aria-label="Основная навигация">
          <ul className={styles.mobileNavList}>
            {menuItems.map((item) => (
              <li key={item.href} className={styles.mobileNavItem}>
                <Link 
                  href={item.href} 
                  className={styles.mobileNavLink} 
                  onClick={onClose}
                  prefetch={false}
                >
                  <span className={styles.mobileNavIcon}>{item.icon}</span>
                  <span className={styles.mobileNavText}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.mobileMenuFooter}>
          <div className={styles.mobileContacts}>
            <p className={styles.mobileContactsTitle}>Свяжитесь с нами:</p>
            <a 
              href="mailto:news@russia.ru" 
              className={styles.mobileContactLink}
              onClick={onClose}
            >
              📧 news@russia.ru
            </a>
            <a 
              href="tel:+78001234567" 
              className={styles.mobileContactLink}
              onClick={onClose}
            >
              📞 8 (800) 123-45-67
            </a>
          </div>
        </div>
      </div>
    </>
  );
}