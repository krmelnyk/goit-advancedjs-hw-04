import axios from 'axios';

export async function getImagesByQuery(query, page) {
  const key = import.meta.env.VITE_PIXABAY_API_KEY;
  if (!key) {
    throw new Error('MISSING_API_KEY');
  }

  const { data } = await axios.get('https://pixabay.com/api/', {
    params: {
      key,
      q: query,
      page,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
    timeout: 15000,
  });
  return data;
}
