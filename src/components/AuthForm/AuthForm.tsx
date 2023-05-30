import { useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import classNames from "classnames";

import { checkStatus } from "../../services/greenapi";
import AuthContext from "../../context/AuthContext";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { TextInput } from "../TextInput/TextInput";
import { ButtonGroup } from "../ButtonGroup/ButtonGroup";
import { IAuthData } from "../../types";
import { Spinner } from "../Spinner/Spinner";

import styles from "./AuthForm.module.scss";
import { handleError } from "../../helpers/error";

const INITIAL_STATE: IAuthData = {
  idInstance: import.meta.env.VITE_API_ID,
  apiTokenInstance: import.meta.env.VITE_API_TOKEN,
};

const MESSAGES = {
  notAuthorized:
    "Аккаунт не авторизован! Для продолжения работы авторизуйтесь в личном кабинете на сайте сервиса!",
  blocked: "Аккаунт заблокирован! Продолжение работы невозможно!",
  sleepMode: "Аккаунт в спящем режиме! Попробуйте позже!",
  starting: "Аккаунт в процессе запуска! Попробуйте позже!",
};

export const AuthForm: React.FC = () => {
  const { logIn } = useContext(AuthContext);
  const [formData, setFormData] = useState<IAuthData>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(({ target }) => {
      const { value, name } = target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const { stateInstance } = await checkStatus(
          formData.idInstance,
          formData.apiTokenInstance
        );

        if (stateInstance === "authorized") {
          logIn(formData);
        } else {
          toast.warning(MESSAGES[stateInstance]);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    },
    [formData, logIn]
  );

  const resetHandler = useCallback(() => {
    setFormData(INITIAL_STATE);
  }, []);

  return (
    <Card className={classNames(styles.root, "p-4")}>
      <h1>Авторизация</h1>
      {loading && <Spinner />}
      <form onSubmit={submitHandler}>
        <TextInput
          label="ID"
          placeholder="Введите ваш ID"
          type="text"
          id="idInstance"
          value={formData.idInstance}
          onChange={inputChangeHandler}
        />
        <TextInput
          label="Токен"
          placeholder="Введите ваш токен"
          type="text"
          id="apiTokenInstance"
          value={formData.apiTokenInstance}
          onChange={inputChangeHandler}
        />
        <ButtonGroup>
          <Button type="submit">OK</Button>
          <Button type="reset" variant="outlined" onClick={resetHandler}>
            Отмена
          </Button>
        </ButtonGroup>
      </form>
    </Card>
  );
};
