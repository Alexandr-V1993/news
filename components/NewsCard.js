// components/NewsCard.js
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function NewsCard({ item }) {
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
          <Link href={`/article/${item.slug}`} prefetch={false}>
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
  );
}