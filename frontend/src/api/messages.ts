import axios from "axios";
import { MessageOut, MessageCreate} from "../types";

const BASE_URL = "http://localhost:8000";

export const getMessages = async (token: string, page = 1, limit = 5): Promise<MessageOut[]> => {
  const res = await axios.get(`${BASE_URL}/messages`, {
    params: { page, limit },
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const addMessage = async (
  token: string,
  payload: MessageCreate
): Promise<{ status: string }> => {
  const res = await axios.post(`${BASE_URL}/messages`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
