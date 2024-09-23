import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

import "./CardContainer.css";
import { Pokemons } from "../../types/pokemonsTypes";
import { PokemonType, typeColorMap } from "../../constants/typeColors";
import { useEffect, useState } from "react";

type PokemonCardProps = {
  pokemon: Pokemons;
};

const Card: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pokemon && pokemon.types) {
      setLoading(false);
    }
  }, [pokemon]);

  if (loading) {
    return <div>Cargando...</div>;
  }
  const primaryType = pokemon.types[0].toLowerCase();
  const backgroundColor = typeColorMap[primaryType as PokemonType] || "#87b8fb";

  const handleDetailClick = () => {
    history.push(`/pokemon-detail/${pokemon.id}`);
  };

  return (
    <div>
      <IonCard
        className="centered-card"
        style={{
          backgroundColor: backgroundColor,
        }}
        onClick={handleDetailClick}
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
