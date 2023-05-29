import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import styles from "./Modal.module.scss";
import classNames from "classnames";
import { Heading } from "../Heading/Heading";

type ModalProps = {
  onClose: () => void;
  heading: string;
  className?: string;
};

const modalRoot = document.getElementById("modal-root");

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  children,
  onClose,
  heading,
  className,
}) => {
  const keyDownHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  if (!modalRoot) return null;

  return createPortal(
    <section className={classNames(styles.modal, className)}>
      <div className={styles.modalOverlay} onClick={onClose} />
      <div className={styles.modalContent}>
        <button
          aria-label="Закрыть модальное окно"
          onClick={onClose}
          className={styles.modalCloseBtn}
        >
          <FaTimes />
        </button>
        <Heading level={3} className={classNames(styles.modalHeading)}>
          {heading}
        </Heading>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </section>,
    modalRoot
  );
};
