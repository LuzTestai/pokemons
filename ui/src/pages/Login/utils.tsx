import { LoginData, LoginDataResponse } from "./types";

const loginData = ({
  email,
  password,
}: LoginData): Promise<LoginDataResponse> => {
  return fetch("http://localhost:3001/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error en la autenticación");
    }
    return response.json();
  });
};

export { loginData };
