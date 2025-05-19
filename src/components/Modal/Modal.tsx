import { useEffect, type ReactNode } from "react";
import sprite from "../../img/sprite.svg";
import css from "./Modal.module.scss";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

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
