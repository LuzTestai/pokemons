import { IonSearchbar } from "@ionic/react";
import "./Filter.css";

type FilterProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const Filter: React.FC<FilterProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="filter-container">
      <IonSearchbar
        value={searchTerm}
        onIonInput={(e: { detail: { value: string } }) =>
          setSearchTerm(e.detail.value!)
        }
        placeholder="Buscar Pokémon..."
        mode="ios"
        debounce={500}
        className="custom-searchbar"
      ></IonSearchbar>
    </div>
  );
};

export default Filter;
