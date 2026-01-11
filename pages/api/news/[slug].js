// pages/api/news/[slug].js
export default async function handler(req, res) {
  const { slug } = req.query;

  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!slug) {
    return res.status(400).json({
      success: false,
      message: 'Slug is required'
    });
  }

  try {
    console.log('Fetching article with slug:', slug);
    
    // Запрашиваем статью из внешнего API
    const apiResponse = await fetch(`http://5.35.95.43:8083/api/news/${slug}`);
    
    if (!apiResponse.ok) {
      if (apiResponse.status === 404) {
        return res.status(404).json({
          success: false,
          message: 'Статья не найдена'
        });
      }
      throw new Error(`Ошибка внешнего API! status: ${apiResponse.status}`);
    }

    const articleData = await apiResponse.json();
    console.log('Article data received:', articleData);
    
    // Определяем категорию на основе содержимого
    let category = 'Новости';
    const title = articleData.title || '';
    
    if (title.includes('Иран') || title.includes('полиция') || title.includes('задержан') || title.includes('власти')) {
      category = 'Политика';
    } else if (title.includes('экономик') || title.includes('ВВП') || title.includes('финанс') || title.includes('рынок')) {
      category = 'Экономика';
    } else if (title.includes('космос') || title.includes('учен') || title.includes('наука') || title.includes('открытие')) {
      category = 'Наука';
    } else if (title.includes('КХЛ') || title.includes('спорт') || title.includes('матч') || title.includes('чемпионат')) {
      category = 'Спорт';
    } else if (title.includes('Трамп') || title.includes('ЕС') || title.includes('международ') || title.includes('ООН')) {
      category = 'Международные отношения';
    } else if (title.includes('технолог') || title.includes('цифр') || title.includes('Интернет') || title.includes('IT')) {
      category = 'Технологии';
    }
    
    // Удаляем Unicode escape-последовательности
    const cleanTitle = title.replace(/\\u[\dA-F]{4}/gi, (match) => 
      String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
    ).trim();
    
    // Форматируем статью
    const formattedArticle = {
      id: articleData.id?.toString() || slug,
      slug: slug,
      title: cleanTitle || 'Статья',
      description: articleData.description || 'Подробности в статье',
      content: articleData.content || `
        <p><strong>${cleanTitle}</strong></p>
        <p>Подробная информация о событии. Следите за обновлениями.</p>
      `,
      date: articleData.date || new Date().toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      category,
      source: articleData.source || 'Новостной портал',
      author: articleData.author || 'Редакция',
      image: articleData.image_url || articleData.image || `https://via.placeholder.com/1200x600/1e40af/ffffff?text=${encodeURIComponent(category)}`,
      readTime: '4 мин',
      views: Math.floor(Math.random() * 5000) + 1000,
      tags: [category.toLowerCase(), 'новости', 'события']
    };

    res.status(200).json({
      success: true,
      article: formattedArticle,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Article API Error:', error);
    
    res.status(500).json({
      success: false,
      article: null,
      message: `Ошибка загрузки статьи: ${error.message}`,
      error: error.toString()
    });
  }
}