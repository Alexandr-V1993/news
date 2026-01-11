// pages/article/[slug].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from '../../styles/Home.module.css';

export default function ArticlePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      loadArticle();
      loadRelatedNews();
    }
  }, [slug]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Loading article with slug:', slug);
      
      // Используем наш прокси-сервер
      const response = await fetch(`/api/news/${slug}`);
      
      console.log('Article response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Статья не найдена');
        }
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }

      const data = await response.json();
      console.log('Article data received:', data);
      
      if (data.success && data.article) {
        setArticle(data.article);
      } else {
        throw new Error(data.message || 'Ошибка загрузки статьи');
      }
      
    } catch (error) {
      console.error('Error loading article:', error);
      setError(error.message);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedNews = async () => {
    try {
      const response = await fetch('/api/news');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.news) {
          // Берем 2 случайные новости, исключая текущую
          const otherNews = data.news
            .filter(item => item.slug !== slug)
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);
          
          setRelatedNews(otherNews);
        }
      }
    } catch (error) {
      console.error('Error loading related news:', error);
      setRelatedNews([]);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container">
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Загрузка статьи...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error && !article) {
    return (
      <Layout>
        <div className="container">
          <div className={styles.error}>
            <h2>Ошибка</h2>
            <p>{error}</p>
            <Link href="/" className={styles.articleBack}>
              ← Вернуться на главную
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="container">
          <div className={styles.error}>
            <h2>Статья не найдена</h2>
            <p>Запрашиваемая статья не существует или была удалена.</p>
            <Link href="/" className={styles.articleBack}>
              ← Вернуться на главную
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container">
        {/* Кнопка назад */}
        <Link href="/" className={styles.articleBack}>
          ← Назад к новостям
        </Link>

        {/* Заголовок статьи */}
        <div className={styles.articleHeader}>
          <span className={styles.articleCategory}>{article.category}</span>
          <h1 className={styles.articleTitle}>{article.title}</h1>
          
          <div className={styles.articleMeta}>
            <span>📅 {article.date}</span>
            <span>📰 {article.source}</span>
            <span>✍️ {article.author}</span>
            <span>⏱️ {article.readTime}</span>
          </div>
        </div>

        {/* Изображение статьи */}
        {article.image && (
          <div className={styles.articleImageContainer}>
            <img 
              src={article.image} 
              alt={article.title}
              className={styles.articleImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/1200x600/1e40af/ffffff?text=${encodeURIComponent(article.category)}`;
              }}
            />
          </div>
        )}

        {/* Контент статьи */}
        <div className={styles.articleContentWrapper}>
          <div 
            className={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Теги */}
        <div className={styles.articleTags}>
          <span className={styles.tagsLabel}>Теги:</span>
          {article.tags && article.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Статистика */}
        <div className={styles.articleStats}>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>👁️</span>
            <span className={styles.statLabel}>Просмотров:</span>
            <span className={styles.statValue}>{article.views}</span>
          </div>
        </div>

        {/* Похожие новости */}
        {relatedNews.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.sectionTitle}>Читайте также</h2>
            <div className={styles.relatedGrid}>
              {relatedNews.map((newsItem) => (
                <div key={newsItem.id} className={styles.relatedCard}>
                  <div className={styles.relatedImage}>
                    <img 
                      src={newsItem.image} 
                      alt={newsItem.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/400x225/1e40af/ffffff?text=${encodeURIComponent(newsItem.category)}`;
                      }}
                    />
                  </div>
                  <div className={styles.relatedContent}>
                    <span className={styles.relatedCategory}>{newsItem.category}</span>
                    <h3 className={styles.relatedTitle}>
                      <Link href={`/article/${newsItem.slug}`}>
                        {newsItem.title}
                      </Link>
                    </h3>
                    <div className={styles.relatedMeta}>
                      <span className={styles.relatedDate}>{newsItem.date}</span>
                    </div>
                    <Link href={`/article/${newsItem.slug}`} className={styles.relatedLink}>
                      Читать →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Кнопка возврата */}
        <div className={styles.backToHome}>
          <Link href="/" className={styles.homeButton}>
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </Layout>
  );
}