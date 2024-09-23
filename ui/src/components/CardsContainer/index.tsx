import React, { useEffect, useState } from "react";
import Card from "../Card";
import { Pokemons } from "../../types/pokemonsTypes";
import { IonGrid, IonRow, IonCol } from "@ionic/react";

type CardsContainerProps = {
  pokemons: Pokemons[];
};

const CardsContainer: React.FC<CardsContainerProps> = ({ pokemons }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pokemons) {
      setLoading(false);
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
