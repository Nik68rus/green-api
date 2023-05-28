import { useCallback, useState } from "react";
import Button from "../Button/Button";
import Card from "../Card/Card";
import { TextInput } from "../TextInput/TextInput";
import styles from "./AuthForm.module.scss";

const INITIAL_STATE = {
  idInstance: import.meta.env.VITE_API_ID,
  apiTokenInstance: import.meta.env.VITE_API_TOKEN,
};

const AuthForm = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);

  const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(({ target }) => {
      const { value, name } = target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(formData);
    const response = await fetch(
      `https://api.green-api.com/waInstance${formData.idInstance}/getSettings/${formData.apiTokenInstance}`
    );
    const data = await response.json();
    console.log(data);
  };

  const resetHandler = useCallback(() => {
    setFormData(INITIAL_STATE);
  }, []);

  return (
    <Card className={styles.root}>
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
        <div className={styles.actions}>
          <Button type="submit">OK</Button>
          <Button type="reset" variant="outlined" onClick={resetHandler}>
            Отмена
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AuthForm;
