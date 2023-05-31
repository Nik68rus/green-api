import { TInstanceState } from "../types";

interface GetStateResponse {
  stateInstance: TInstanceState;
}

interface GetLogoutResponse {
  isLogout: boolean;
}

interface GetQrResponse {
  type: "qrCode" | "error" | "alreadyLogged";
  message: string;
}

interface PostSettingsResponse {
  saveSettings: boolean;
}

export const DEFAULT_API_ERROR = "Что-то пошло не так! Попробуйте позже!";

const REQUIRED_SETTINGS = {
  webhookUrl: "",
  outgoingWebhook: "yes",
  stateWebhook: "yes",
  incomingWebhook: "yes",
};

export const checkStatus = async (id: string, token: string) => {
  const response = await fetch(
    `https://api.green-api.com/waInstance${id}/getStateInstance/${token}`
  );

  return (await response.json()) as GetStateResponse;
};

export const logout = async (id: string, token: string) => {
  const response = await fetch(
    `https://api.green-api.com/waInstance${id}/logout/${token}`
  );

  const data = await response.json();
  return data as GetLogoutResponse;
};

export const getQrCode = async (id: string, token: string) => {
  const response = await fetch(
    `https://api.green-api.com/waInstance${id}/qr/${token}`
  );

  return (await response.json()) as GetQrResponse;
};

export const getSettings = async (id: string, token: string) => {
  const response = await fetch(
    `https://api.green-api.com/waInstance${id}/getSettings/${token}`
  );

  const data = await response.json();
  return data;
};

export const setSettings = async (id: string, token: string) => {
  const response = await fetch(
    `https://api.green-api.com/waInstance${id}/setSettings/${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(REQUIRED_SETTINGS),
    }
  );

  const data = await response.json();
  return data as PostSettingsResponse;
};

export const actualizeSettings = async (id: string, token: string) => {
  const settings = await getSettings(id, token);
  if (
    settings &&
    (settings.webhookUrl !== "" ||
      settings.outgoingWebhook !== "yes" ||
      settings.stateWebhook !== "yes" ||
      settings.incomingWebhook !== "yes")
  ) {
    return await setSettings(id, token);
  }
  return { saveSettings: false };
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
