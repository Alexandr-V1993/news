import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function NewsCard({ article }) {
  return (
    <article className={styles.newsCard}>
      <div className={styles.cardImage}>
        <img src={article.image} alt={article.title} loading="lazy" />
        <span className={styles.cardCategory}>{article.category}</span>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.cardMeta}>
          <time className={styles.cardDate}>{article.date}</time>
          <span className={styles.cardSource}>{article.source}</span>
        </div>
        
        <h3 className={styles.cardTitle}>
          <Link href={`/article/${article.id}`}>{article.title}</Link>
        </h3>
        
        <p className={styles.cardExcerpt}>{article.description}</p>
        
        <div className={styles.cardFooter}>
          <Link href={`/article/${article.id}`} className={styles.readMore}>
            Читать далее →
          </Link>
          <div className={styles.cardStats}>
            <span className={styles.statItem}>👁️ {article.views}</span>
            <span className={styles.statItem}>💬 {article.comments}</span>
          </div>
        </div>
      </div>
    </article>
  );
}