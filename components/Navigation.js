// components/Navigation.js
import Link from 'next/link';
import styles from '../styles/Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <div className="container">
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            📰 Новостной портал
          </Link>
          
          <div className={styles.navLinks}>
            <Link href="/">Главная</Link>
            <Link href="/#politics">Политика</Link>
            <Link href="/#economy">Экономика</Link>
            <Link href="/#sports">Спорт</Link>
            <Link href="/#tech">Технологии</Link>
          </div>
          
          <button 
            className={styles.refreshButton}
            onClick={() => window.location.reload()}
          >
            🔄 Обновить
          </button>
        </div>
      </div>
    </nav>
  );
}