import React, { useCallback, useContext, useEffect, useState } from "react";
import { Modal } from "../../Modal/Modal";

import styles from "./QrModal.module.scss";
import AuthContext from "../../../context/AuthContext";
import { getQrCode } from "../../../services/greenapi";
import { Spinner } from "../../Spinner/Spinner";
import { handleError } from "../../../helpers/error";

interface ModalProps {
  onClose: () => void;
}

export const QrModal: React.FC<ModalProps> = ({ onClose }) => {
  const [code, setCode] = useState("");
  const { authData } = useContext(AuthContext);

  const getCode = useCallback(async () => {
    if (authData) {
      try {
        const result = await getQrCode(
          authData.idInstance,
          authData.apiTokenInstance
        );
        if (result.type === "qrCode") {
          setCode(result.message);
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        handleError(error);
        onClose();
      }
    }
  }, [authData, onClose]);

  useEffect(() => {
    getCode();
    const interval = setInterval(getCode, 10000);
    return () => clearInterval(interval);
  }, [getCode]);

  return (
    <Modal heading="Авторизация инстанса" onClose={onClose}>
      {code === "" && <Spinner />}
      <div className={styles.root}>
        <p className={styles.info}>
          Для продолжения работы отсканирйте код в приложении WhatsApp
        </p>
        <div className={styles.image}>
          {code.length > 0 ? (
            <img src={`data:image/png;base64,${code}`} />
          ) : null}
        </div>
        <p className={styles.note}>
          При авторизации инстанса через QR код возможна задержка при отпраке
          первого сообщения!
        </p>
      </div>
    </Modal>
  );
};
