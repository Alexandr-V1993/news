// pages/index.js
import Layout from '../components/Layout';
import { getAllNews } from '../lib/api';
import styles from '../styles/Home.module.css';

// Временный компонент BreakingNews прямо в файле
function BreakingNews({ text, time }) {
  if (!text) return null;
  
  return (
    <div className={styles.breakingNews}>
      <span className={styles.breakingLabel}>СРОЧНО</span>
      <span className={styles.breakingText}>{text}</span>
      <span className={styles.breakingTime}>{time}</span>
    </div>
  );
}

// Компонент карточки новости
function NewsCard({ item }) {
  return (
    <div className={styles.newsCard}>
      <div className={styles.cardImage}>
        <img 
          src={item.image} 
          alt={item.title}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://via.placeholder.com/400x225/1e40af/ffffff?text=${encodeURIComponent(item.category)}`;
          }}
        />
        <span className={styles.cardCategory}>{item.category}</span>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.cardMeta}>
          <span className={styles.cardDate}>{item.date}</span>
          <div className={styles.sourceContainer}>
            <img 
              src={item.source_logo} 
              alt={item.source_name}
              className={styles.sourceLogo}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
            <span className={styles.cardSource}>{item.source_name}</span>
          </div>
        </div>
        
        <h3 className={styles.cardTitle}>
          <a href={`/article/${item.slug}`}>
            {item.title}
          </a>
        </h3>
        
        <p className={styles.cardDescription}>{item.description}</p>
        
        <div className={styles.cardFooter}>
          <a href={`/article/${item.slug}`} className={styles.readMore}>
            Читать далее →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function HomePage({ news, breakingNews, error }) {
  return (
    <Layout>
      <div className="container">
        {/* Breaking News Banner */}
        <BreakingNews text={breakingNews.text} time={breakingNews.time} />

        {/* Основной заголовок */}
        <h1 className={styles.mainTitle}>Последние новости</h1>
        
        {/* Сообщение об ошибке */}
        {error && (
          <div className={styles.errorMessage}>
            <p>⚠️ {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className={styles.retryButton}
            >
              Попробовать снова
            </button>
          </div>
        )}

        {/* Сетка новостей */}
        <div className={styles.newsGrid}>
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>

        {news.length === 0 && !error && (
          <div className={styles.noNews}>
            <p>Новости не найдены</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

// Получаем данные на сервере при каждом запросе
export async function getServerSideProps() {
  try {
    const newsItems = await getAllNews();
    
    const breakingNews = newsItems.length > 0 ? {
      text: newsItems[0].title,
      time: 'Только что'
    } : { text: '', time: '' };

    return {
      props: {
        news: newsItems,
        breakingNews,
        error: null
      }
    };
  } catch (error) {
    console.error('SSR Error:', error);
    return {
      props: {
        news: [],
        breakingNews: { text: '', time: '' },
        error: `Ошибка загрузки данных: ${error.message}`
      }
    };
  }
}