import { useCallback, useContext, useState } from "react";
import Button from "../Button/Button";
import Card from "../Card/Card";
import { TextInput } from "../TextInput/TextInput";
import styles from "./AuthForm.module.scss";
import classNames from "classnames";
import { toast } from "react-toastify";
import { ButtonGroup } from "../ButtonGroup/ButtonGroup";
import { IAuthData, TInstanceState } from "../../types";
import AuthContext from "../../context/AuthContext";

const INITIAL_STATE: IAuthData = {
  idInstance: import.meta.env.VITE_API_ID,
  apiTokenInstance: import.meta.env.VITE_API_TOKEN,
};

interface GetStateResponse {
  stateInstance: TInstanceState;
}

const MESSAGES = {
  notAuthorized:
    "Аккаунт не авторизован! Для продолжения работы авторизуйтесь в личном кабинете на сайте сервиса!",
  blocked: "Аккаунт заблокирован! Продолжение работы невозможно!",
  sleepMode: "Аккаунт в спящем режиме! Попробуйте позже!",
  starting: "Аккаунт в процессе запуска! Попробуйте позже!",
};

const AuthForm: React.FC = () => {
  const { logIn } = useContext(AuthContext);
  const [formData, setFormData] = useState<IAuthData>(INITIAL_STATE);

  const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(({ target }) => {
      const { value, name } = target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://api.green-api.com/waInstance${formData.idInstance}/getStateInstance/${formData.apiTokenInstance}`
    );

    const data = (await response.json()) as GetStateResponse;

    if (data.stateInstance === "authorized") {
      logIn(formData);
    } else {
      toast.warning(MESSAGES[data.stateInstance]);
    }
  };

  const resetHandler = useCallback(() => {
    setFormData(INITIAL_STATE);
  }, []);

  return (
    <Card className={classNames(styles.root, "p-4")}>
      <h1>Авторизация</h1>
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

export default AuthForm;
