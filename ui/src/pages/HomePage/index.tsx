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
import { queryClient } from "../../main";
import LogoutButton from "../../components/LogoutButton";

type PokemonData = {
  pokemons: Pokemons[];
  totalPages: number;
};

const fetchPokemons = async (page: number, limit: number) => {
  const response = await fetch(
    `http://localhost:3001/api/pokemons?limit=${limit}&page=${page}`
  );
  if (!response.ok) {
    throw new Error("Error fetching Pokémon");
  }
  return response.json();
};

const Home: React.FC = () => {
  const limit = 12;
  // const [page, setPage] = useState(1);
  const [page, setPage] = useState<number>(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemons[]>([]); // Estado para los Pokémon filtrados
  const { data, error, isLoading } = useQuery<PokemonData>({
    queryKey: ["pokemons", page],
    queryFn: () => fetchPokemons(page, limit),
    placeholderData: keepPreviousData,
  });
  // Store the current page number in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("currentPage", page.toString());
  }, [page]);
  // Filtrar solo los Pokémon de la página actual
  useEffect(() => {
    if (data && searchTerm) {
      // Filtrar solo los Pokémon visibles en la página actual
      const filtered = data.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemons(filtered);
    } else if (data) {
      // Si no hay término de búsqueda, mostrar todos los Pokémon de la página actual
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
  useEffect(() => {
    console.log("FILTER:", filteredPokemons);
  }, [filteredPokemons]);
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
