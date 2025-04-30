export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface DecodedToken {
  sub: string;
  role: string;
  exp: number;
}

export interface MessageCreate {
  user_id: string;
  message: string;
}

export interface MessageOut {
  userID: string;
  message: string;
}

