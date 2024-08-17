import { useState, useEffect } from 'react';
import 'modern-normalize';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar.jsx';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import Loader from '../Loader/Loader.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import ImageModal from '../ImageModal/ImageModal.jsx';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const fetchImages = async (keyword, page) => {
    const apiKey = '43854622-acb16c386b106d84adf209c8f';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
      keyword
    )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      if (data.hits.length === 0) {
        setHasMore(false);
        toast.error('No images found');
      } else setHasMore(true);
      return data.hits;
    } catch (error) {
      toast.error('Failed to fetch images');
      throw error;
    }
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    setLoading(true);
    setError(null);

    fetchImages(query, page)
      .then(hits => setImages(prevImages => [...prevImages, ...hits]))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [query, page]);

  const handleSearchSubmit = searchQuery => {
    if (searchQuery.trim() === '') {
      toast.error('Please enter a search query.');
      return;
    }
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = image => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster position="top-right" reverseOrder={false} />
      {error && <ErrorMessage message={error.message} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && hasMore && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </>
  );
}
