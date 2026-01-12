// components/Layout.js
import Head from 'next/head';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout({ 
  children, 
  title = 'Новостной портал',
  description = 'Последние новости России и мира',
  image = 'https://via.placeholder.com/1200x630/1e40af/ffffff?text=Новости',
  url = ''
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        
        {/* Structured Data для новостей */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              "headline": title,
              "description": description,
              "image": image,
              "datePublished": new Date().toISOString(),
              "dateModified": new Date().toISOString(),
              "author": {
                "@type": "Organization",
                "name": "Новостной портал"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Новостной портал",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://via.placeholder.com/100x30/1e40af/ffffff?text=Новости"
                }
              }
            })
          }}
        />
      </Head>
      
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}