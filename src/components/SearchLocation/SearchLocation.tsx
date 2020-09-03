import React, { createRef } from "react";

import styles from "./SearchLocation.module.scss";
import { LatLng } from "leaflet";

type Props = {
  city: string;
  suggestionsList: string[];
  isOpen: boolean,
  onFetchCity: (cityName: string) => void;
  onSearchLocation: (location: LatLng) => void;
};

const SearchLocation: React.FC<Props> = ({
  city,
  suggestionsList,
  isOpen,
  onFetchCity,
  onSearchLocation,
}) => {
  const input = createRef<any>();

  return (
    <div className={styles.SearchLocation}>
      <label className={styles.SearchLocation___Label}>
        Search for city:
        <input
        className={styles.SearchLocation_Input}
          type="text"
          value={city}
          ref={input}
          onChange={() => onFetchCity(input.current.value)}
        />
        {isOpen && suggestionsList.length > 0 && (
          <div className={styles.SearchLocation_SuggestionsList}>
            <ul>
              {suggestionsList.map((suggestion: any, index: number) => (
                <li className={styles.SearchLocation_SuggestionsList_ListItem}
                  key={index}
                  onClick={() => onSearchLocation(suggestion.location)}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </label>
    </div>
  );
};

export default SearchLocation;
