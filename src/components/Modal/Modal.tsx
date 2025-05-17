import type { ReactNode } from "react";
import sprite from "../../img/sprite.svg";
import css from "./Modal.module.scss";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg width={32} height={32}>
            <use href={`${sprite}#close`}></use>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
