import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/HomePage";
import Register from "./pages/Register";
import PokemonPage from "./pages/DetailPage";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoutes";

import "@ionic/react/css/core.css";

import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";

import "./theme/variables.css";
import Login from "./pages/Login";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Layout>
          <PrivateRoute exact path="/home" component={Home} />
          <Route path="/pokemon-detail/:id" component={PokemonPage} />
        </Layout>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
