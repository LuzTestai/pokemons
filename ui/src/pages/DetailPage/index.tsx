// components/PokemonDetail.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePokemonDetails } from "./utils";
import { RouteParams } from "./types";
import PokemonDetail from "../../components/Detail";
import "./PokemonDetail.css";

const PokemonPage = () => {
  const { id } = useParams<RouteParams>();
  const { data, error, isLoading } = usePokemonDetails(id);

  useEffect(() => {
    console.log("ENTRE", data, "id:", id);
  }, [data, id]);

  return (
    <div className="container-detail">
      <PokemonDetail data={data} error={error} isLoading={isLoading} />
    </div>
  );
};

export default PokemonPage;
