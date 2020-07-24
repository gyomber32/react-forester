/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useEffect, useState, useCallback } from "react";
import { LatLngExpression, LatLng } from "leaflet";

import Map from "../../components/Map/Map";
import Navigation from "../../components/Navigation/Navigation";

import styles from "./Map.module.scss";

import Tree from "../../models/types/Tree";
import Backdrop from "../../components/Backdrop/Backdrop";
import Spinner from "../../components/Spinner/Spinner";

import getPosition from "../../utils/Position";
import { getAllTrees } from "../../api";

const mapPage: React.FC = () => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [loading, setLoadingState] = useState<boolean>(false);
  const [position, setPosition] = useState<LatLngExpression>();

  const fetchAllTrees = useCallback(async () => {
    try {
      const trees = await getAllTrees();
      setTrees(trees);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setLoadingState(true);
    getPosition()
      .then((position) => {
        return new LatLng(position.coords.latitude, position.coords.longitude);
      })
      .then((position) => {
        setPosition(position);
      });
    fetchAllTrees();
    setLoadingState(false);
  }, []);

  return (
    <Fragment>
      {console.log("Map page rerender")}
      <Navigation />
      <div className={styles.Map}>
        {loading && (
          <Fragment>
            <Backdrop></Backdrop>
            <Spinner></Spinner>
          </Fragment>
        )}
        {!loading && <Map position={position} trees={trees} />}
      </div>
    </Fragment>
  );
};

export default mapPage;
