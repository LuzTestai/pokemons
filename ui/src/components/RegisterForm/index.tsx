import { IonButton, IonInput, IonItem, IonLabel } from "@ionic/react";
import { SetStateAction, useState } from "react";

const RegisterForm: React.FC<{
  onRegister: (
    name: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
}> = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onRegister(name, lastName, email, password);
  };

  return (
    <form className="form-register" onSubmit={handleSubmit}>
      <div className="input-group">
        <IonLabel className="custom-label" position="floating">
          Nombre
        </IonLabel>
        <IonInput
          value={name}
          onIonChange={(e: { detail: { value: SetStateAction<string> } }) =>
            setName(e.detail.value!)
          }
          required
          className="custom-input"
          placeholder="Nombre"
        />
      </div>
      <div className="input-group">
        <IonLabel className="custom-label" position="floating">
          Apellido
        </IonLabel>
        <IonInput
          value={lastName}
          onIonChange={(e: { detail: { value: SetStateAction<string> } }) =>
            setLastName(e.detail.value!)
          }
          required
          className="custom-input"
          placeholder="Apellido"
        />
      </div>
      <div className="input-group">
        <IonLabel className="custom-label" position="floating">
          Email
        </IonLabel>
        <IonInput
          type="email"
          value={email}
          onIonChange={(e: { detail: { value: SetStateAction<string> } }) =>
            setEmail(e.detail.value!)
          }
          required
          className="custom-input"
          placeholder="Email.."
        />
      </div>
      <div className="input-group">
        <IonLabel className="custom-label" position="floating">
          Contraseña
        </IonLabel>
        <IonInput
          type="password"
          value={password}
          onIonChange={(e: { detail: { value: SetStateAction<string> } }) =>
            setPassword(e.detail.value!)
          }
          required
          className="custom-input"
          placeholder="Contraseña"
        />
      </div>
      <IonButton className="custom-button" expand="block" type="submit">
        Registrar
      </IonButton>
    </form>
  );
};

export default RegisterForm;
