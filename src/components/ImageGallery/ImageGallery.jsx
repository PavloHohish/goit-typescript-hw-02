import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function ImageGallery({ images, onImageClick }) {
  if (!images.length) {
    return null;
  }

  return (
    <ul className={css.list}>
      {images.map((image, index) => (
        <li className={css.li} key={index} onClick={() => onImageClick(image)}>
          <ImageCard src={image.webformatURL} alt={image.tags} />
        </li>
      ))}
    </ul>
  );
}
