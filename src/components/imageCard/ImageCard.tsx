import { FC } from "react";

import css from "./ImageCard.module.css";
import { Image } from "../../Types.ts";

interface ImageCardProps {
  image: Image;
  openModal: (photo: Image) => void;
}

const ImageCard: FC<ImageCardProps> = ({ image, openModal }) => {
  const { urls } = image;

  return (
    <div>
      <img
        src={urls.small}
        alt=""
        onClick={() => {
          openModal(image);
        }}
        className={css["item-img"]}
      />
    </div>
  );
};

export default ImageCard;