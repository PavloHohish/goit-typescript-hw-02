import { useState, useEffect } from 'react';
import 'modern-normalize';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar.jsx';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import Loader from '../Loader/Loader.jsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import ImageModal from '../ImageModal/ImageModal.jsx';
import fetchImages from '../../services/pixabay.js';

export interface Image {
  id: number;
  webformatURL: string;
  tags: string;
  largeImageURL: string;
}

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    setLoading(true);
    setError(null);

    fetchImages(query, page)
      .then(({ images, hasMoreImg }) => {
        setImages(prevImages => [...prevImages, ...images]);
        setHasMore(hasMoreImg);
      })
      .catch(err => setError(err.message || 'Failed to fetch images'))
      .finally(() => setLoading(false));
  }, [submitted, page]);

  const handleSearchSubmit = (searchQuery: string | null) => {
    if (searchQuery === null || searchQuery.trim() === '') {
      toast.error('Please enter a search query.');
      return;
    }
    setSubmitted(prevState => !prevState);
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (image: Image) => {
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
