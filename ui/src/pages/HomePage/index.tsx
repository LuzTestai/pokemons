import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./HomePage.css";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "../../components/Card";
import { Pokemons } from "../../types/pokemonsTypes";
import CardsContainer from "../../components/CardsContainer";

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
  const limit = 12;
  const { data, error, isLoading } = useQuery({
    queryKey: ["pokemons", limit],
    queryFn: () => fetchPokemons(limit),
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <img
              src="/pokemon-logo-pokemon-icon-transparent-free-png.webp"
              alt="Pokemon Logo"
              style={{ maxWidth: "20%" }}
            />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <p>filtro quizas</p>
        <CardsContainer pokemons={data} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
