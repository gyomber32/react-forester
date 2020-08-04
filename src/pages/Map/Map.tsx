/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useState, useEffect, useCallback } from "react";

import Map from "../../components/Map/Map";
import Navigation from "../../components/Navigation/Navigation";
import Popup from "../../components/Popup/Popup";
import Backdrop from "../../components/Backdrop/Backdrop";
import Spinner from "../../components/Spinner/Spinner";

import { usePosition } from "../../hooks";

import {
  useTrees,
  useLoader,
  usePopup,
  useSeedlings,
  useWeather,
} from "../../hooks/store";
import { useFetchAllTrees } from "../../hooks/tree";
import { useFetchAllSeedlings } from "../../hooks/seedling";
import { useFetchWeather } from "../../hooks/weather";

import styles from "./Map.module.scss";
import Forecast from "../../components/Forecast/Forecast";
import SearchLocation from "../../components/SearchLocation/SearchLocation";
import { LatLng } from "leaflet";

const mapPage: React.FC = () => {
  const fetchTrees = useFetchAllTrees();
  const fecthSeedlings = useFetchAllSeedlings();
  const fetchWeather = useFetchWeather();
  const trees = useTrees();
  const seedlings = useSeedlings();
  const { position, address, fetchPositionAndCity, fetchCity, cityName, suggestionsList } = usePosition();
  const isLoading = useLoader();
  const popup = usePopup();
  const weather = useWeather();

  const [screenSize, setScreenSize] = useState({
    height: (window.innerHeight * 2) / 3,
    width: (window.innerWidth * 2) / 3,
  });

  (function () {
    window.onresize = displayWindowSize;
    window.onload = displayWindowSize;

    function displayWindowSize() {
      let myWidth = (window.innerWidth * 2) / 3;
      let myHeight = (window.innerHeight * 2) / 3;
      setScreenSize({ height: myHeight, width: myWidth });
    }
  })();

  const searchLocation = useCallback((location: LatLng) => {
    fetchPositionAndCity(location);
  },[fetchPositionAndCity]);

  useEffect(() => {
    fetchTrees();
    fecthSeedlings();
    fetchWeather(position);
  }, [fecthSeedlings, fetchTrees, fetchWeather, position]);

  return (
    <Fragment>
      <Navigation />
      <div className={styles.Map}>
        {isLoading && (
          <Fragment>
            <Backdrop></Backdrop>
            <Spinner></Spinner>
          </Fragment>
        )}
        {popup.isOpen && <Popup message={popup.message}></Popup>}
        {!isLoading && (
          <Fragment>
            <SearchLocation
              city={cityName}
              suggestionsList={suggestionsList}
              onFetchCity={fetchCity}
              onSearchLocation={searchLocation}
            />
            <div
              style={{
                margin: "auto",
                height: screenSize.height,
                width: screenSize.width,
              }}
            >
              <Map
                position={position!}
                trees={trees}
                seedlings={seedlings}
                size={screenSize}
              />
            </div>
          </Fragment>
        )}
        {!isLoading && weather && (
          <Forecast weather={weather} address={address}></Forecast>
        )}
      </div>
    </Fragment>
  );
};

export default mapPage;
