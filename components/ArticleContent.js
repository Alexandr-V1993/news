// components/ArticleContent.js
import Link from 'next/link';
import styles from '../styles/Article.module.css';

export default function ArticleContent({ article }) {
  return (
    <>
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
          <div className={styles.sourceInfo}>
            <img 
              src={article.source_logo} 
              alt={article.source_name}
              className={styles.sourceLogo}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
            <span>📰 {article.source_name}</span>
          </div>
          <span>✍️ {article.author}</span>
          <span>⏱️ {article.readTime}</span>
        </div>
      </div>

      {/* Изображение статьи */}
      <div className={styles.articleImageContainer}>
        <img 
          src={article.image} 
          alt={article.title}
          className={styles.articleImage}
          loading="lazy"
        />
      </div>

      {/* Контент статьи - рендерится на сервере! */}
      <article className={styles.articleContentWrapper}>
        <div 
          className={styles.articleContent}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* Теги */}
      <div className={styles.articleTags}>
        <span className={styles.tagsLabel}>Теги:</span>
        {article.tags.map((tag) => (
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
    </>
  );
}