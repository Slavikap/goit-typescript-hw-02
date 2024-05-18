import ImageCard from "../imageCard/ImageCard";
import { FC } from "react";
import { Image } from "../../Types.ts";
import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: Image[];
  openModal: (photo: Image) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, openModal }) => {
  return (
    <div>
      <ul className={css["img-gallery"]}>
        {images.map((image) => (
          <ImageCard key={image.id} image={image} openModal={openModal} />
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;