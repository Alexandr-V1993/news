import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ 
  children, 
  title = 'Новости России - Последние новости страны и мира',
  description = 'Актуальные новости России: политика, экономика, спорт, культура и технологии. Будьте в курсе событий!',
  image = 'https://via.placeholder.com/1200x630/1e40af/ffffff?text=Новости+России',
  keywords = 'новости России, политика, экономика, спорт, культура, технологии, последние новости',
  ogType = 'website'
}) {
  const router = useRouter();
  const currentUrl = `https://ваш-домен.ru${router.asPath}`;
  const siteName = 'Новости России';

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Основные мета-теги */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        
        {/* Каноническая ссылка */}
        <link rel="canonical" href={currentUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content={ogType} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="ru_RU" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="@news_russia" />
        
        {/* Дополнительные мета-теги */}
        <meta name="theme-color" content="#1e40af" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Structured Data для всего сайта */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              "name": siteName,
              "url": "https://ваш-домен.ru",
              "logo": {
                "@type": "ImageObject",
                "url": "https://ваш-домен.ru/logo.png",
                "width": 600,
                "height": 60
              },
              "sameAs": [
                "https://facebook.com/newsrussia",
                "https://twitter.com/news_russia",
                "https://t.me/news_russia"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+7-800-123-45-67",
                "contactType": "customer service",
                "availableLanguage": ["Russian"]
              }
            })
          }}
        />
        
        {/* Иконки */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      
      <div id="app">
        <Navbar />
        <main id="main-content" role="main">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}