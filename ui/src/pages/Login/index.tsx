import { IonToast, IonLoading } from "@ionic/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import LoginForm from "../../components/Login";
import "./LoginPage.css";
import { useHistory } from "react-router-dom";
import { LoginData, LoginDataResponse } from "./types";
import { loginData } from "./utils";

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const history = useHistory();

  const { mutate, isPending } = useMutation<
    LoginDataResponse,
    Error,
    LoginData
  >({
    mutationFn: loginData,
    onSuccess: (data: LoginDataResponse) => {
      localStorage.setItem("token", data.token);
      setShowToast(true);
      history.push("/home");
    },
    onError: (error: any) => {
      setError(error.message || "Error en la autenticación");
    },
  });

  const handleLogin = (email: string, password: string) => {
    mutate({ email, password });
  };

  return (
    <div className="login-page">
      <div className="login-title">Inicio de Sesión</div>
      {isPending && (
        <IonLoading isOpen={isPending} message={"Iniciando sesión..."} />
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
