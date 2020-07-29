import React, { Fragment, useState } from "react";

import Map from "../../components/Map/Map";
import Navigation from "../../components/Navigation/Navigation";

import styles from "./Map.module.scss";

import Backdrop from "../../components/Backdrop/Backdrop";
import Spinner from "../../components/Spinner/Spinner";

import { usePosition } from "../../hooks";
import Popup from "../../components/Popup/Popup";

import { useTrees } from "../../hooks/store";

const mapPage: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const bme = useTrees();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { position } = usePosition();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  //const { isLoading, popup } = useFetchTree();
  // eslint-disable-next-line react-hooks/rules-of-hooks
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

  return (
    <Fragment>
      <Navigation />
      {/* <div className={styles.Map}>
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
            <Map position={position!} trees={bme} size={screenSize} />
          </div>
        )}
      </div> */}
    </Fragment>
  );
};

export default mapPage;
