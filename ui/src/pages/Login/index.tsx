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
import { useHistory } from "react-router-dom"; // Para redirección después del login

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const history = useHistory(); // Para redirección

  // Credenciales harcodeadas
  const storedUser = { email: "usuario@ejemplo.com", password: "123456" };

  const handleLogin = (email: string, password: string) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (email === storedUser.email && password === storedUser.password) {
        localStorage.setItem("user", JSON.stringify({ email })); // Guardar el usuario
        setShowToast(true); // Mostrar mensaje de éxito
        history.push("/home"); // Redirigir a la página de inicio después del login exitoso
      } else {
        setError("Credenciales incorrectas");
      }
    }, 1000);
  };

  return (
    <IonPage className="login-page">
      <IonTitle className="login-title">Inicio de Sesión</IonTitle>
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
    </IonPage>
  );
};

export default LoginPage;
