import css from "./LoadMoreBtn.module.css";

import { FC } from "react";

interface onClickProps {
  onClick: () => void;
}

const LoadMoreBtn: FC<onClickProps> = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={css["btn-load-more"]}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;