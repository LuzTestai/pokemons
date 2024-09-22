import {
  IonPage,
  IonToast,
  IonTitle,
  IonLoading,
  IonContent,
} from "@ionic/react";
import { useState } from "react";
import LoginForm from "../../components/Login";
import "./LoginPage.css";
import { useHistory } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  const handleLogin = (email: string, password: string) => {
    setLoading(true);
    fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        setLoading(false);
        if (!response.ok) {
          throw new Error("Error en la autenticación");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        setShowToast(true);
        history.push("/home");
      })
      .catch((error) => {
        setError(error.message || "Error en la autenticación");
      });
  };

  return (
    <div className="login-page">
      <div className="login-title">Inicio de Sesión</div>
      {loading && (
        <IonLoading isOpen={loading} message={"Iniciando sesión..."} />
      )}

      <LoginForm onLogin={handleLogin} />

      {error && (
        <IonToast
          isOpen={!!error}
          message={error}
          duration={3000}
          color="danger"
          onDidDismiss={() => setError(null)}
        />
      )}
      <IonToast
        isOpen={showToast}
        message="Login exitoso"
        duration={3000}
        color="success"
        onDidDismiss={() => setShowToast(false)}
      />
    </div>
  );
};

export default LoginPage;
