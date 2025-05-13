import axios from 'axios';

const API_URL = 'https://api.lo.ink/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let currentToken = null;

export const setAuthToken = token => {
  currentToken = token;
};

export const authenticate = async token => {
  try {
    setAuthToken(token);
    return {success: true};
  } catch (error) {
    console.error('Ошибка аутентификации:', error);
    throw error;
  }
};

export const getFeedPosts = async (page = 1, count = 5) => {
  try {
    if (!currentToken) {
      throw new Error('Токен не установлен');
    }

    const offset = (page - 1) * count;
    console.log(
      `Загрузка страницы ${page}, offset: ${offset}, count: ${count}`,
    );

    const response = await api.get('/posts/feed', {
      params: {
        offset: offset,
        count: count,
      },
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    });

    const data = response.data.data;
    console.log(`Получено постов: ${data.items?.length}, всего: ${data.count}`);

    return {
      items: data.items || [],
      total: data.count,
      hasMore: offset + count < data.count,
    };
  } catch (error) {
    console.error(
      'Ошибка при получении постов:',
      error.response?.data || error,
    );
    throw error;
  }
};

export default api;
