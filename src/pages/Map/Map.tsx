import React, { Fragment } from "react";

import Map from "../../components/Map/Map";
import Navigation from "../../components/Navigation/Navigation";

import styles from "./Map.module.scss";

import Backdrop from "../../components/Backdrop/Backdrop";
import Spinner from "../../components/Spinner/Spinner";

import { useFetchTree, usePosition } from "../../hooks";
import Popup from "../../components/Popup/Popup";

const mapPage: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { position, error } = usePosition();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { trees, isLoading, popup } = useFetchTree();

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
        {!isLoading && <Map position={position!} trees={trees} />}
      </div>
    </Fragment>
  );
};

export default mapPage;
