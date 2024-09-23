// components/Layout.js
import React from "react";
import { IonHeader, IonToolbar } from "@ionic/react";
import LogoutButton from "../LogoutButton"; // Asegúrate de tener el import correcto

const Layout = ({ children }: any) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <div className="toolbar-content">
            <img
              src="/pokemon-logo-pokemon-icon-transparent-free-png.webp"
              alt="Pokemon Logo"
              style={{ maxWidth: "20%" }}
            />
            <LogoutButton />
          </div>
        </IonToolbar>
      </IonHeader>
      {children}
    </>
  );
};

export default Layout;
