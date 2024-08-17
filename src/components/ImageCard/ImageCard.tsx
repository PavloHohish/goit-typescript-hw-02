import { Image } from '../App/App';

type Props = {
  src: string;
  alt: string;
};

export default function ImageCard({ src, alt }: Props) {
  return (
    <>
      <img src={src} alt={alt} />
    </>
  );
}
