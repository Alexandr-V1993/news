// pages/index.js
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function HomePage() {
  const [news, setNews] = useState([]);
  const [breakingNews, setBreakingNews] = useState({ text: '', time: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading news from /api/news...');
      
      const response = await fetch('/api/news');
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ошибка! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      
      if (data.success && data.news) {
        setNews(data.news);
        setBreakingNews(data.breakingNews);
      } else {
        throw new Error(data.message || 'Ошибка загрузки новостей');
      }
    } catch (error) {
      console.error('Error loading news:', error);
      setError(error.message);
      setNews([]);
      setBreakingNews({ text: '', time: '' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container">
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Загрузка новостей...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container">
        {/* Breaking News Banner */}
        {breakingNews.text && (
          <div className={styles.breakingNews}>
            <span className={styles.breakingLabel}>СРОЧНО</span>
            <span className={styles.breakingText}>{breakingNews.text}</span>
            <span className={styles.breakingTime}>{breakingNews.time}</span>
          </div>
        )}

        {/* Основной заголовок */}
        <h1 className={styles.mainTitle}>Последние новости</h1>
        
        {/* Сообщение об ошибке (если есть) */}
        {error && (
          <div className={styles.errorMessage}>
            <p>⚠️ {error}</p>
            <button onClick={loadNews} className={styles.retryButton}>
              Попробовать снова
            </button>
          </div>
        )}

        {/* Сетка новостей */}
        <div className={styles.newsGrid}>
          {news.map((item) => (
            <div key={item.id} className={styles.newsCard}>
              <div className={styles.cardImage}>
                <img 
                  src={item.image} 
                  alt={item.title}
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
                  <span className={styles.cardSource}>{item.source}</span>
                </div>
                <h3 className={styles.cardTitle}>
                  <Link href={`/article/${item.slug}`}>
                    {item.title}
                  </Link>
                </h3>
                <p className={styles.cardDescription}>{item.description}</p>
                <div className={styles.cardFooter}>
                  <Link href={`/article/${item.slug}`} className={styles.readMore}>
                    Читать далее →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {news.length === 0 && !loading && !error && (
          <div className={styles.noNews}>
            <p>Новости не найдены</p>
            <button onClick={loadNews} className={styles.retryButton}>
              Обновить
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}