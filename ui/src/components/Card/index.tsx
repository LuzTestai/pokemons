import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { box } from "../../../styled-system/patterns";

import "./CardContainer.css";
import { Pokemons } from "../../types/pokemonsTypes";
import { PokemonType, typeColorMap } from "../../constants/typeColors";
import { useEffect, useState } from "react";

type PokemonCardProps = {
  pokemon: Pokemons; // El tipo 'Pokemon' que definimos
};

const Card: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const [loading, setLoading] = useState(true); // Estado local para manejar el "loading"

  useEffect(() => {
    console.log("POKEMON", pokemon);
    if (pokemon && pokemon.types) {
      setLoading(false); // Cuando los datos están listos, cambiamos loading a false
    }
  }, [pokemon]);

  if (loading) {
    return <div>Cargando...</div>;
  }
  const primaryType = pokemon.types[0].toLowerCase();
  const backgroundColor =
    typeColorMap[primaryType as PokemonType] || "colors.gray.100";
  console.log("background", backgroundColor);
  return (
    // <div className={css({ bg: backgroundColor })} style={{ backgroundColor: backgroundColor }}>
    <div>
      <IonCard
        className="centered-card"
        style={{
          backgroundColor: backgroundColor,
          maxWidth: "80%",
        }}
      >
        <IonCardHeader className="centered-card-header">
          <IonCardTitle>
            <img src={pokemon.image} />
          </IonCardTitle>
          <IonCardSubtitle className="letter-title">
            {pokemon.name}
          </IonCardSubtitle>
        </IonCardHeader>

        {/* <IonCardContent>Here's a small</IonCardContent> */}
      </IonCard>
    </div>
  );
};

export default Card;
