import { IonSearchbar } from "@ionic/react";
import "./Filter.css";

const Filter: React.FC = () => {
  return (
    <div className="filter-container">
      <IonSearchbar
        placeholder="Buscar Pokémon..."
        mode="ios"
        debounce={500}
        className="custom-searchbar"
      ></IonSearchbar>
    </div>
  );
};

export default Filter;
