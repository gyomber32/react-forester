import React, { createRef } from "react";

import styles from "./SearchLocation.module.scss";
import { LatLng } from "leaflet";

type Props = {
  city: string;
  suggestionsList: string[];
  onFetchCity: (cityName: string) => void;
  onSearchLocation: (location: LatLng) => void;
};

const SearchLocation: React.FC<Props> = ({
  city,
  suggestionsList,
  onFetchCity,
  onSearchLocation,
}) => {
  const input = createRef<any>();

  return (
    <div className={styles.SearchLocation}>
      <label>
        Search for city:
        <input
          type="text"
          value={city}
          ref={input}
          onChange={() => onFetchCity(input.current.value)}
        />
        <ul>
          {suggestionsList.map((suggestion: any, index: number) => (
            <li
              key={index}
              onClick={() => onSearchLocation(suggestion.location)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      </label>
    </div>
  );
};

export default SearchLocation;
