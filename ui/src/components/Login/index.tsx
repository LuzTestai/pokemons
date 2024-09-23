import {
  IonContent,
  IonInput,
  IonLabel,
  IonButton,
  IonText,
  IonItem,
} from "@ionic/react";
import { useState } from "react";
import "./Login.css";
import { useHistory } from "react-router";

const Login: React.FC<{
  onLogin: (email: string, password: string) => void;
}> = ({ onLogin }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir la recarga de la página
    const errors: { email?: string; password?: string } = {};

    if (!validateEmail(email)) {
      errors.email = "Correo electrónico inválido";
    }
    if (password.length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(errors);

    if (!errors.email && !errors.password) {
      onLogin(email, password);
    }
  };

  const goToRegister = () => {
    console.log("clickie");
    history.push("/register");
  };
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <IonLabel className="custom-label" position="stacked">
          EMAIL:
        </IonLabel>
        <IonInput
          type="email"
          value={email}
          onIonInput={(e: any) => setEmail(e.target.value)}
          placeholder="Ingresa tu email"
          className="custom-input"
        />
        {errors.email && <IonText color="danger">{errors.email}</IonText>}
      </div>
      <div className="input-group">
        <IonLabel className="custom-label" position="stacked">
          CONTRASEÑA:
        </IonLabel>
        <IonInput
          type="password"
          value={password}
          onIonInput={(e: any) => setPassword(e.target.value)}
          placeholder="Ingresa tu contraseña"
          className="custom-input"
        />
        {errors.password && <IonText color="danger">{errors.password}</IonText>}
      </div>
      <IonButton expand="block" className="custom-button" type="submit">
        Iniciar Sesión
      </IonButton>
      <IonButton
        expand="block"
        className="custom-button"
        type="button"
        onClick={goToRegister}
      >
        Crear cuenta
      </IonButton>
    </form>
  );
};

export default Login;
