import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
import { Image } from '../App/App';

type Props = {
  images: Image[];
  onImageClick: (arg: Image) => void;
};

export default function ImageGallery({ images, onImageClick }: Props) {
  if (!images.length) {
    return null;
  }

  return (
    <ul className={css.list}>
      {images.map(image => (
        <li
          className={css.li}
          key={image.id}
          onClick={() => onImageClick(image)}
        >
          <ImageCard src={image.webformatURL} alt={image.tags} />
        </li>
      ))}
    </ul>
  );
}
