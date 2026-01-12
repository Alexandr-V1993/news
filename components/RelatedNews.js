// components/RelatedNews.js
import Link from 'next/link';
import styles from '../styles/Article.module.css';

export default function RelatedNews({ news, currentSlug }) {
  return (
    <section className={styles.relatedSection}>
      <h2 className={styles.sectionTitle}>Читайте также</h2>
      <div className={styles.relatedGrid}>
        {news
          .filter(item => item.slug !== currentSlug)
          .slice(0, 2)
          .map((newsItem) => (
            <div key={newsItem.id} className={styles.relatedCard}>
              <div className={styles.relatedImage}>
                <img 
                  src={newsItem.image} 
                  alt={newsItem.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/400x225/1e40af/ffffff?text=${encodeURIComponent(newsItem.category)}`;
                  }}
                />
              </div>
              <div className={styles.relatedContent}>
                <span className={styles.relatedCategory}>{newsItem.category}</span>
                <h3 className={styles.relatedTitle}>
                  <Link href={`/article/${newsItem.slug}`} prefetch={false}>
                    {newsItem.title}
                  </Link>
                </h3>
                <div className={styles.relatedMeta}>
                  <span className={styles.relatedDate}>{newsItem.date}</span>
                  <div className={styles.relatedSource}>
                    <img 
                      src={newsItem.source_logo} 
                      alt={newsItem.source_name}
                      className={styles.sourceLogoSmall}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                      }}
                    />
                    <span>{newsItem.source_name}</span>
                  </div>
                </div>
                <Link href={`/article/${newsItem.slug}`} className={styles.relatedLink}>
                  Читать →
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}