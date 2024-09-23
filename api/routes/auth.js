const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
require("dotenv").config();

// Credenciales harcodeadas por ahora (esto sería desde una base de datos)
const users = [
  { email: "usuario@ejemplo.com", password: bcrypt.hashSync("123456", 8) },
];

const SECRET_KEY = process.env.SECRET_KEY;

// Ruta para iniciar sesión
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Verificar si el usuario existe
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).json({ message: "Usuario no encontrado" });
  }

  // Verificar la contraseña
  const passwordIsValid = bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: "Contraseña incorrecta" });
  }

  // Generar un token JWT válido por 24 horas
  const token = jwt.sign({ email: user.email, userId: user.id }, SECRET_KEY, {
    expiresIn: "24h",
  });

  // Enviar el token al frontend
  res.json({ token });
});

// Ruta protegida de ejemplo
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Acceso autorizado", user: req.user });
});

// Middleware para verificar el token JWT
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "No se proporcionó un token" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
    req.user = decoded;
    next();
  });
}

// Ruta para registrar nuevos usuarios
router.post("/register", async (req, res) => {
  const { name, lastName, email, password } = req.body;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "La contraseña debe tener al menos 6 caracteres, incluir un número y una mayúscula.",
    });
  }

  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    return res.status(409).json({ message: "El usuario ya existe" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    name,
    lastName,
    email,
    password: hashedPassword,
  };
  users.push(newUser); // Guardar el nuevo usuario

  const token = jwt.sign({ email: newUser.email }, SECRET_KEY, {
    expiresIn: "24h",
  });

  res.status(201).json({ user: newUser, token });
});

module.exports = router;
