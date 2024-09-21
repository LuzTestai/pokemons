import { UserCredentials, UserData } from "./types";

// const registerUser = ({
//   name,
//   lastName,
//   email,
//   password,
// }: UserCredentials): Promise<UserData> => {
//   // Simulando un tiempo de espera como si se estuviera haciendo una llamada a la API
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

//       if (!passwordRegex.test(password)) {
//         reject(
//           new Error(
//             "La contraseña debe tener al menos 6 caracteres, incluir un número y una mayúscula."
//           )
//         );
//       } else {
//         // Simulación de una respuesta exitosa con los datos del usuario
//         resolve({
//           user: {
//             name,
//             lastName,
//             email,
//           },
//         });
//       }
//     }, 1000); // Simula un delay de 1 segundo
//   });
// };

const registerUser = ({ name, lastName, email, password }: UserCredentials) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      "La contraseña debe tener al menos 6 caracteres, incluir un número y una mayúscula."
    );
  }
  // Simulando una llamada de API
  return fetch("http://localhost:3001/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, lastName, email, password }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor"); // Manejo de errores HTTP
    }
    return response.json() as Promise<UserData>; // Asumiendo que la respuesta del servidor incluye los datos necesarios
  });
};

export { registerUser };
