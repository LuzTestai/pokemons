// components/PokemonDetail.js
import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonImg,
  IonChip,
  IonLoading,
} from "@ionic/react";
import "./Detail.css";
import { PropsDetail } from "./types";
import { PokemonType, typeColorMap } from "../../constants/typeColors";

const PokemonDetail = ({ data, error, isLoading }: PropsDetail) => {
  if (isLoading) return <IonLoading isOpen={true} message={"Cargando..."} />;
  if (error) return <div>Error: {error.message}</div>;

  const primaryType = data.type[0].toLowerCase();
  const backgroundColor = typeColorMap[primaryType as PokemonType] || "#87b8fb";
  return (
    <div className="container-card">
      <IonCard
        className="pokemon-card"
        style={{
          border: `1px solid ${backgroundColor}`,
        }}
      >
        <IonImg
          className="img-detail"
          style={{
            backgroundColor: backgroundColor,
          }}
          src={data.image}
          alt={data.name}
        />

        <IonCardHeader>
          <IonCardTitle className="name-pokemon">{data.name}</IonCardTitle>
          <IonCardSubtitle className="number-pokemon">
            N°{data.id}
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <p>Peso: {data.weight}</p>
          <p>Altura: {data.height}</p>
          {data.type.map((type: any, index: any) => (
            <IonChip
              className="button-type"
              style={{
                background:
                  typeColorMap[data.type[index].toLowerCase() as PokemonType],
              }}
              key={index}
            >
              {type}
            </IonChip>
          ))}
          <p>{data.description}</p>
        </IonCardContent>
      </IonCard>
    </div>
  );
};

export default PokemonDetail;
