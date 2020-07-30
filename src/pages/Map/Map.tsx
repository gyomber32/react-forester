/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useState, useEffect } from "react";

import Map from "../../components/Map/Map";
import Navigation from "../../components/Navigation/Navigation";
import Popup from "../../components/Popup/Popup";
import Backdrop from "../../components/Backdrop/Backdrop";
import Spinner from "../../components/Spinner/Spinner";

import { usePosition } from "../../hooks";
import { useTrees, useLoader, usePopup, useSeedlings } from "../../hooks/store";
import { useFetchAllTrees } from "../../hooks/tree";
import { useFetchAllSeedlings } from "../../hooks/seedling";

import styles from "./Map.module.scss";

const mapPage: React.FC = () => {
  const fetchTrees = useFetchAllTrees();
  const fecthSeedlings = useFetchAllSeedlings();
  const trees = useTrees();
  const seedlings = useSeedlings();
  const { position } = usePosition();
  const isLoading = useLoader();
  const popup = usePopup();
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

  useEffect(() => {
    fetchTrees();
    fecthSeedlings()
  }, [fecthSeedlings, fetchTrees]);

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
          <div
            style={{
              margin: "55px auto",
              height: screenSize.height,
              width: screenSize.width
            }}
          >
            <Map position={position!} trees={trees} seedlings={seedlings} size={screenSize} />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default mapPage;
