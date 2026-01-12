// components/BreakingNews.js
import styles from '../styles/Home.module.css';

export default function BreakingNews({ text, time }) {
  return (
    <div className={styles.breakingNews}>
      <span className={styles.breakingLabel}>СРОЧНО</span>
      <span className={styles.breakingText}>{text}</span>
      <span className={styles.breakingTime}>{time}</span>
    </div>
  );
}