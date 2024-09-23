import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
} from "@ionic/react";
import "./HomePage.css";
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import CardsContainer from "../../components/CardsContainer";
import { arrowBack, arrowForward } from "ionicons/icons";
import Filter from "../../components/Filter";
import { Pokemons } from "../../types/pokemonsTypes";
import LogoutButton from "../../components/LogoutButton";
import { fetchPokemons } from "./utils";
import { PokemonData } from "./types";

const Home: React.FC = () => {
  const limit = 12;
  const [page, setPage] = useState<number>(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemons[]>([]);
  const { data, error, isLoading } = useQuery<PokemonData>({
    queryKey: ["pokemons", page],
    queryFn: () => fetchPokemons(page, limit),
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    localStorage.setItem("currentPage", page.toString());
  }, [page]);
  useEffect(() => {
    if (data && searchTerm) {
      const filtered = data.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemons(filtered);
    } else if (data) {
      setFilteredPokemons(data.pokemons);
    }
  }, [searchTerm, data]);

  const handleNextPage = () => {
    if (data && page < data.totalPages) {
      setPage(page + 1);
      setSearchTerm("");
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setSearchTerm("");
    }
  };
  return (
    <IonPage>
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
      <IonContent fullscreen>
        {isLoading ? (
          <div className="container-loading">
            <IonLoading
              isOpen={isLoading}
              spinner="bubbles"
              cssClass="custom-loading"
            />
          </div>
        ) : error ? (
          <p>Error al cargar los Pokémon</p>
        ) : (
          <>
            <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <CardsContainer pokemons={filteredPokemons} />
            <div className="pagination-controls">
              <IonIcon
                icon={arrowBack}
                size="large"
                onClick={handlePreviousPage}
                style={{ cursor: "pointer", color: "yellow" }}
                className={page === 1 ? "disabled" : ""}
              />

              <span>
                Página {page} de {data?.totalPages}
              </span>
              <IonIcon
                icon={arrowForward}
                size="large"
                onClick={handleNextPage}
                style={{ cursor: "pointer", color: "yellow" }}
                className={page === data?.totalPages ? "disabled" : ""}
              />
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
