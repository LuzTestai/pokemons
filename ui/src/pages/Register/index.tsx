import { IonPage, IonTitle, IonToast, IonLoading } from "@ionic/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import RegisterForm from "../../components/RegisterForm";
import "./Register.css";
import { useHistory } from "react-router-dom";
import { registerUser } from "./utils";
import { UserCredentials, UserData } from "./types";

const Register: React.FC = () => {
  const history = useHistory();
  const [showToast, setShowToast] = useState(false);

  const { mutate, isPending, error } = useMutation<
    UserData,
    Error,
    UserCredentials
  >({
    mutationFn: registerUser,
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data.user));
      setShowToast(true);
      history.push("/login");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const handleRegister = (
    name: any,
    lastName: any,
    email: any,
    password: any
  ) => {
    mutate({ name, lastName, email, password });
  };

  return (
    <div className="register-page">
      <div className="register-title">Registro</div>
      {isPending && (
        <IonLoading isOpen={isPending} message={"Registrando..."} />
      )}

      <RegisterForm onRegister={handleRegister} />

      {error && (
        <IonToast
          isOpen={!!error}
          message={error.message}
          duration={3000}
          color="danger"
          onDidDismiss={() => console.log("Toast dismissed")}
        />
      )}
      <IonToast
        isOpen={showToast}
        message="Registro exitoso"
        duration={3000}
        color="success"
        onDidDismiss={() => setShowToast(false)}
      />
    </div>
  );
};

export default Register;
