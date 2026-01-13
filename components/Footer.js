import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { href: '/about', label: 'О нас' },
    { href: '/contacts', label: 'Контакты' },
    { href: '/privacy', label: 'Политика конфиденциальности' },
    { href: '/terms', label: 'Пользовательское соглашение' },
    { href: '/advertising', label: 'Реклама' },
    { href: '/vacancies', label: 'Вакансии' },
  ];

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerMain}>
            <div className={styles.footerBrand}>
              <Link href="/" className={styles.footerLogo}>
                <span className={styles.logoIcon}>🇷🇺</span>
                <span className={styles.footerLogoText}>Новости России</span>
              </Link>
              <p className={styles.footerDescription}>
                Самые актуальные и проверенные новости России и мира. 
                Мы предоставляем полный спектр информации по всем ключевым темам.
              </p>
            </div>

            <div className={styles.footerLinks}>
              <div className={styles.footerColumn}>
                <h4 className={styles.footerColumnTitle}>Разделы</h4>
                <ul className={styles.footerLinksList}>
                  <li><Link href="/category/politics">Политика</Link></li>
                  <li><Link href="/category/economy">Экономика</Link></li>
                  <li><Link href="/category/sport">Спорт</Link></li>
                  <li><Link href="/category/culture">Культура</Link></li>
                </ul>
              </div>

              <div className={styles.footerColumn}>
                <h4 className={styles.footerColumnTitle}>О проекте</h4>
                <ul className={styles.footerLinksList}>
                  {footerLinks.slice(0, 3).map(link => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.footerColumn}>
                <h4 className={styles.footerColumnTitle}>Информация</h4>
                <ul className={styles.footerLinksList}>
                  {footerLinks.slice(3).map(link => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <div className={styles.footerContacts}>
              <a href="mailto:news@russia.ru" className={styles.footerContact}>
                news@russia.ru
              </a>
              <a href="tel:+78001234567" className={styles.footerContact}>
                8 (800) 123-45-67
              </a>
            </div>

            <div className={styles.footerSocial}>
              <a href="https://t.me/news_russia" aria-label="Telegram">
                📱
              </a>
              <a href="https://vk.com/newsrussia" aria-label="ВКонтакте">
                🔵
              </a>
              <a href="https://youtube.com/newsrussia" aria-label="YouTube">
                ▶️
              </a>
            </div>

            <div className={styles.footerCopyright}>
              <p>© {currentYear} Новости России. Все права защищены.</p>
              <p>При использовании материалов ссылка обязательна.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}