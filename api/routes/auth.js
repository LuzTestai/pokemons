const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Credenciales harcodeadas por ahora (esto sería desde una base de datos)
const users = [
  { email: "usuario@ejemplo.com", password: bcrypt.hashSync("123456", 8) },
];

// Clave secreta para firmar los JWT (esto debe estar en una variable de entorno)
const SECRET_KEY = "your_secret_key_here";

// Ruta para iniciar sesión
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Verificar si el usuario existe
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).json({ message: "Usuario no encontrado" });
  }

  // Verificar la contraseña
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: "Contraseña incorrecta" });
  }

  // Generar un token JWT válido por 24 horas
  const token = jwt.sign({ email: user.email }, SECRET_KEY, {
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

module.exports = router;
