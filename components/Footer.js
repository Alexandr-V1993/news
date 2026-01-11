import styles from '../styles/Home.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Разделы',
      links: [
        { href: '/category/politics', label: 'Политика' },
        { href: '/category/economy', label: 'Экономика' },
        { href: '/category/sport', label: 'Спорт' },
        { href: '/category/culture', label: 'Культура' },
        { href: '/category/science', label: 'Наука' },
        { href: '/category/technology', label: 'Технологии' },
      ]
    },
    {
      title: 'Информация',
      links: [
        { href: '/about', label: 'О нас' },
        { href: '/contacts', label: 'Контакты' },
        { href: '/advert', label: 'Реклама' },
        { href: '/vacancies', label: 'Вакансии' },
        { href: '/privacy', label: 'Конфиденциальность' },
        { href: '/terms', label: 'Пользовательское соглашение' },
      ]
    }
  ];

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div>
            <div className={styles.footerLogo}>
              <span>🇷🇺</span>
              <span>Новости России</span>
            </div>
            <p className={styles.footerDescription}>
              Самые свежие и достоверные новости со всей России.
              Мы работаем 24/7, чтобы держать вас в курсе событий.
            </p>
            <div className={styles.footerSocial}>
              <a href="#" className={styles.socialLink} aria-label="ВКонтакте">VK</a>
              <a href="#" className={styles.socialLink} aria-label="Telegram">TG</a>
              <a href="#" className={styles.socialLink} aria-label="Одноклассники">OK</a>
              <a href="#" className={styles.socialLink} aria-label="YouTube">YT</a>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className={styles.footerTitle}>{section.title}</h4>
              <ul className={styles.footerLinks}>
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={styles.footerLink}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className={styles.footerTitle}>Контакты</h4>
            <address className={styles.footerContact}>
              <p className={styles.contactItem}>
                <span>📧</span>
                <a href="mailto:news@russia.ru">news@russia.ru</a>
              </p>
              <p className={styles.contactItem}>
                <span>📞</span>
                <a href="tel:+78001234567">8 (800) 123-45-67</a>
              </p>
              <p className={styles.contactItem}>
                <span>📍</span>
                Москва, ул. Новостная, д. 1
              </p>
              <p className={styles.contactItem}>
                <span>🕐</span>
                Редакция работает круглосуточно
              </p>
            </address>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© {currentYear} Новости России. Все права защищены.</p>
          <p>Свидетельство о регистрации СМИ ЭЛ № ФС 77 - 12345 от 01.01.2024</p>
        </div>
      </div>
    </footer>
  );
}