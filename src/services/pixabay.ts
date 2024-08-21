import toast from 'react-hot-toast';
import { Image } from '../components/App/App';

export default async function fetchImages(
  keyword: string,
  page: number
): Promise<{ images: Image[]; hasMoreImg: boolean }> {
  const apiKey = '43854622-acb16c386b106d84adf209c8f';
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    keyword
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }
    const data = (await response.json()) as { hits: Image[] };
    const hasMoreImg = data.hits.length > 0;
    if (!hasMoreImg) {
      toast.error('No images found');
    }
    return { images: data.hits, hasMoreImg: hasMoreImg };
  } catch (error) {
    toast.error('Failed to fetch images');
    throw error;
  }
}
