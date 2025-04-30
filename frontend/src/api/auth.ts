import axios from "axios";
import qs from "qs";

import { LoginRequest, TokenResponse } from "../types";

const BASE_URL = "http://localhost:8000";

export const login = async (data: LoginRequest): Promise<TokenResponse> => {
  const res = await axios.post(
    `${BASE_URL}/token`,
    qs.stringify(data),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
  return res.data;
};
