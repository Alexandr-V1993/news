// pages/api/news.js
export default async function handler(req, res) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('Fetching news from external API...');
    
    // Запрашиваем данные с твоего API
    const apiResponse = await fetch('http://5.35.95.43:8083/api/news');
    
    if (!apiResponse.ok) {
      console.error('External API error:', apiResponse.status);
      throw new Error(`Ошибка внешнего API! status: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    console.log('Received data from external API, items count:', data.items?.length || 0);
    
    // Если API возвращает объект со свойством items
    const newsItems = data.items || data || [];
    
    // Форматируем новости для фронтенда
    const formattedNews = newsItems.slice(0, 20).map((item) => {
      // Определяем категорию на основе ключевых слов в заголовке
      let category = 'Новости';
      const title = item.title || '';
      
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
      
      // Удаляем Unicode escape-последовательности из заголовка
      const cleanTitle = title.replace(/\\u[\dA-F]{4}/gi, (match) => 
        String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
      ).trim();
      
      return {
        id: item.id?.toString() || Math.random().toString(),
        title: cleanTitle || 'Без названия',
        description: item.description || 'Читайте подробности в статье',
        content: item.content || `Подробности: ${cleanTitle}`,
        date: item.date || new Date().toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        category,
        source: item.source || 'Новостной портал',
        image: item.image_url || item.image || `https://via.placeholder.com/800x450/1e40af/ffffff?text=${encodeURIComponent(category)}`,
        slug: item.slug || item.id?.toString() || 'unknown',
        url: `http://5.35.95.43:8083/api/news/${item.slug || item.id}`
      };
    });

    // Breaking news - первая новость в списке
    const breakingNews = formattedNews.length > 0 ? {
      text: formattedNews[0].title,
      time: 'Только что'
    } : { text: '', time: '' };

    console.log('Returning formatted news:', formattedNews.length);
    
    res.status(200).json({ 
      success: true, 
      news: formattedNews,
      breakingNews,
      timestamp: new Date().toISOString(),
      total: newsItems.length
    });

  } catch (error) {
    console.error('API Proxy Error:', error);
    
    // Возвращаем только ошибку, без демо-данных
    res.status(500).json({
      success: false,
      news: [],
      breakingNews: { text: '', time: '' },
      timestamp: new Date().toISOString(),
      message: `Ошибка загрузки данных: ${error.message}`,
      error: error.toString()
    });
  }
}