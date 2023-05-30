import { TInstanceState } from "../types";

interface GetStateResponse {
  stateInstance: TInstanceState;
}

export const DEFAULT_API_ERROR = "Что-то пошло не так! Попробуйте позже!";

export const checkStatus = async (id: string, token: string) => {
  const response = await fetch(
    `https://api.green-api.com/waInstance${id}/getStateInstance/${token}`
  );

  return (await response.json()) as GetStateResponse;
};

export const deleteNotification = async (
  id: string,
  token: string,
  receiptId: string
) => {
  const response = await fetch(
    `https://api.green-api.com/waInstance${id}/deleteNotification/${token}/${receiptId}`,
    { method: "DELETE" }
  );

  const data = await response.json();

  return data;
};

export const recieveNotification = async (id: string, token: string) => {
  const response = await fetch(
    `https://api.green-api.com/waInstance${id}/receiveNotification/${token}`
  );
  const data = await response.json();

  return data;
};

export const sendMessage = async (
  id: string,
  token: string,
  tel: string,
  text: string
) => {
  const body = {
    chatId: tel + "@c.us",
    message: text,
  };

  const response = await fetch(
    `https://api.green-api.com/waInstance${id}/sendMessage/${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();
  return data;
};
