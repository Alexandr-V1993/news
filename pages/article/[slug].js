// pages/article/[slug].js
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ArticleContent from '../../components/ArticleContent';
import RelatedNews from '../../components/RelatedNews';
import { getNewsItem, getAllNews, getNewsSlugs } from '../../lib/api';
import styles from '../../styles/Article.module.css';

export default function ArticlePage({ article, relatedNews, error }) {
  const router = useRouter();

  if (router.isFallback) {
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

  if (error) {
    return (
      <Layout>
        <div className="container">
          <div className={styles.error}>
            <h2>Ошибка</h2>
            <p>{error}</p>
            <a href="/" className={styles.articleBack}>
              ← Вернуться на главную
            </a>
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
            <a href="/" className={styles.articleBack}>
              ← Вернуться на главную
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title={article.title}
      description={article.description}
      image={article.image}
    >
      <div className="container">
        <ArticleContent article={article} />
        
        {/* Похожие новости */}
        {relatedNews.length > 0 && (
          <RelatedNews news={relatedNews} currentSlug={article.slug} />
        )}
      </div>
    </Layout>
  );
}

// Генерируем статические пути для всех статей
export async function getStaticPaths() {
  const slugs = await getNewsSlugs();
  
  const paths = slugs.map(({ slug }) => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: true // true для новых статей
  };
}

// Получаем данные для каждой статьи на этапе сборки
export async function getStaticProps({ params }) {
  try {
    const article = await getNewsItem(params.slug);
    
    if (!article) {
      return {
        notFound: true
      };
    }

    // Получаем похожие новости
    const allNews = await getAllNews();
    const relatedNews = allNews
      .filter(item => item.slug !== params.slug && item.category === article.category)
      .slice(0, 2);

    return {
      props: {
        article,
        relatedNews,
        error: null
      },
      revalidate: 60 // Обновляем каждые 60 секунд
    };
  } catch (error) {
    console.error('SSG Error:', error);
    return {
      props: {
        article: null,
        relatedNews: [],
        error: `Ошибка загрузки статьи: ${error.message}`
      },
      revalidate: 10
    };
  }
}