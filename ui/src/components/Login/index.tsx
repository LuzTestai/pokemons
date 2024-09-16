import {
  IonContent,
  IonPage,
  IonInput,
  IonLabel,
  IonButton,
} from "@ionic/react";
import "./Login.css";

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="login-container">
        <form className="login-form">
          <div className="input-group">
            <IonLabel className="custom-label" position="stacked">
              EMAIL:
            </IonLabel>
            <IonInput
              type="email"
              placeholder="Ingresa tu email"
              className="custom-input"
            />
          </div>
          <div className="input-group">
            <IonLabel className="custom-label" position="stacked">
              CONTRASEÑA:
            </IonLabel>
            <IonInput
              type="password"
              placeholder="Ingresa tu contraseña"
              className="custom-input"
            />
          </div>
          <IonButton expand="block" className="custom-button">
            Iniciar Sesión
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
