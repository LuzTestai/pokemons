import React, { useEffect, useState } from "react";
import Card from "../Card"; // Importa el componente Card
import { Pokemons } from "../../types/pokemonsTypes";
import { IonGrid, IonRow, IonCol } from "@ionic/react";

type CardsContainerProps = {
  pokemons: Pokemons[]; // Lista de Pokémon que se pasan como props
};

const CardsContainer: React.FC<CardsContainerProps> = ({ pokemons }) => {
  const [loading, setLoading] = useState(true); // Estado local para manejar el "loading"

  useEffect(() => {
    if (pokemons) {
      setLoading(false); // Cuando los datos están listos, cambiamos loading a false
    }
  }, [pokemons]);

  if (loading && !pokemons) {
    return <div>Cargando...</div>;
  }
  return (
    <IonGrid>
      <IonRow>
        {pokemons.map((pokemon) => (
          <IonCol
            size="12"
            size-sm="6"
            size-md="4"
            size-lg="3"
            key={pokemon.name}
            className="cards-container"
          >
            <Card pokemon={pokemon} />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default CardsContainer;
