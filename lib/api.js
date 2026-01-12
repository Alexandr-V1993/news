// lib/api.js
const API_BASE_URL = 'http://5.35.95.43:8083/api';

export async function getAllNews() {
  try {
    const response = await fetch(`${API_BASE_URL}/news`);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    
    const data = await response.json();
    const newsItems = data.items || data || [];
    
    return newsItems.slice(0, 20).map((item) => formatNewsItem(item));
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function getNewsItem(slug) {
  try {
    const response = await fetch(`${API_BASE_URL}/news/${slug}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    return formatNewsItem(data);
  } catch (error) {
    console.error('Error fetching news item:', error);
    return null;
  }
}

export async function getNewsSlugs() {
  try {
    const news = await getAllNews();
    return news.map(item => ({
      slug: item.slug
    }));
  } catch (error) {
    console.error('Error getting slugs:', error);
    return [];
  }
}

function formatNewsItem(item) {
  const title = item.title || '';
  const cleanTitle = title.replace(/\\u[\dA-F]{4}/gi, (match) => 
    String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
  ).trim();
  
  // Определяем категорию
  let category = 'Новости';
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
  
  return {
    id: item.id?.toString() || Math.random().toString(),
    title: cleanTitle || 'Без названия',
    description: item.description || 'Читайте подробности в статье',
    content: item.content || `
      <p><strong>${cleanTitle}</strong></p>
      <p>Подробная информация о событии. Следите за обновлениями.</p>
      <p>Полный текст статьи доступен на источнике.</p>
    `,
    date: item.date || new Date().toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    category,
    source_name: item.source_name || item.source || 'Новостной портал',
    source_logo: item.source_logo || `https://via.placeholder.com/100x30/1e40af/ffffff?text=${encodeURIComponent(item.source || 'Новости')}`,
    author: item.author || 'Редакция',
    image: item.image_url || item.image || `https://via.placeholder.com/1200x600/1e40af/ffffff?text=${encodeURIComponent(category)}`,
    slug: item.slug || item.id?.toString() || 'unknown',
    readTime: '4 мин',
    views: Math.floor(Math.random() * 5000) + 1000,
    tags: [category.toLowerCase(), 'новости', 'события']
  };
}