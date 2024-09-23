import React, { useEffect } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { power } from "ionicons/icons";
import "./LogoutButton.css";

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <IonButton
      className="button-logout"
      onClick={handleLogout}
      fill="clear"
      type="button"
    >
      <IonIcon icon={power} className="logout-icon" />
    </IonButton>
  );
};

export default LogoutButton;
