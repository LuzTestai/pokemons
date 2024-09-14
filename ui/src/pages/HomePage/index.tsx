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
import { useQuery } from "@tanstack/react-query";
import CardsContainer from "../../components/CardsContainer";
import { arrowBack, arrowForward } from "ionicons/icons";
import Filter from "../../components/Filter";

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
  const [page, setPage] = useState(1); // Estado de la página actual
  const { data, error, isLoading } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => fetchPokemons(page, limit),
  });

  useEffect(() => {
    console.log("data", data);
  }, [data]);
  const handleNextPage = () => {
    console.log("hice clcik");
    if (data && page < data.totalPages) {
      console.log("entre al if");
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
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
        {isLoading ? (
          <div className="container-loading">
            <IonLoading
              isOpen={isLoading}
              //  onDidDismiss={() => setShowLoading(false)}
              spinner="bubbles" // Opciones creativas: "bubbles", "crescent", "dots", etc.
              cssClass="custom-loading" // Puedes agregar una clase personalizada
            />
          </div>
        ) : error ? (
          <p>Error al cargar los Pokémon</p>
        ) : (
          <>
            <Filter />
            <CardsContainer pokemons={data.pokemons} />
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
