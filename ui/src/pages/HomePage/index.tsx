import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import "./HomePage.css";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchPokemons = async (limit: number) => {
  const response = await fetch(
    `http://localhost:3001/api/pokemons?limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("Error fetching Pokémon");
  }
  return response.json();
};

const Home: React.FC = () => {
  const limit = 10;
  const { data, error, isLoading } = useQuery({
    queryKey: ["pokemons", limit],
    queryFn: () => fetchPokemons(limit),
  });

  useEffect(() => {
    console.log("data", data);
  }, [data]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
