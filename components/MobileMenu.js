import { useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function MobileMenu({ isOpen, onClose }) {
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
    <div className={styles.mobileMenu}>
      {/* Компонент уже реализован в Navbar.js */}
    </div>
  );
}