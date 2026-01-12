// components/Footer.js
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerInfo}>
            <h3>📰 Новостной портал</h3>
            <p>Актуальные новости России и мира 24/7</p>
          </div>
          
          <div className={styles.footerLinks}>
            <div>
              <h4>Рубрики</h4>
              <a href="/#politics">Политика</a>
              <a href="/#economy">Экономика</a>
              <a href="/#sports">Спорт</a>
              <a href="/#tech">Технологии</a>
            </div>
            
            <div>
              <h4>Информация</h4>
              <a href="/about">О проекте</a>
              <a href="/contacts">Контакты</a>
              <a href="/privacy">Политика конфиденциальности</a>
            </div>
          </div>
        </div>
        
        <div className={styles.copyright}>
          <p>© {new Date().getFullYear()} Новостной портал. Все права защищены.</p>
          <p>Источник новостей: внешний API сервер</p>
        </div>
      </div>
    </footer>
  );
}