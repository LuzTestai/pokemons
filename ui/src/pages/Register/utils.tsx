import { UserCredentials, UserData } from "./types";

const registerUser = ({ name, lastName, email, password }: UserCredentials) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      "La contraseña debe tener al menos 6 caracteres, incluir un número y una mayúscula."
    );
  }
  return fetch("http://localhost:3001/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, lastName, email, password }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }
    return response.json() as Promise<UserData>;
  });
};

export { registerUser };
