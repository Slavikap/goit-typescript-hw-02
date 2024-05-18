import Modal from "react-modal";
import { FC } from "react";
import { Image } from "../../Types.ts";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "90vh",
  },
};

Modal.setAppElement("#root");

interface ImageModalProps {
  image: Image;
  openModal: boolean;
  closeModal: () => void;
}

const ImageModal: FC<ImageModalProps> = ({ image, openModal, closeModal }) => {
  const { urls, alt_description } = image;

  return (
    <Modal isOpen={openModal} onRequestClose={closeModal} style={customStyles}>
      <div>
        <img src={urls.regular} alt={alt_description} />
        <p>{alt_description}</p>
      </div>
    </Modal>
  );
};

export default ImageModal;