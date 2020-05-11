import React, { Fragment, useEffect, useState } from "react";
import { LatLngExpression, LatLng } from "leaflet";

import Map from "../../components/Map/Map";
import Navigation from "../../components/Navigation/Navigation";

import axios from "axios";

import styles from "./Map.module.scss";

import Seedling from "../../models/types/Seedling";
import Backdrop from "../../components/Backdrop/Backdrop";
import Spinner from "../../components/Spinner/Spinner";

import getPosition from "../../utils/Position";

const mapPage: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [seedlings, setSeedlings] = useState<Seedling[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoadingState] = useState<boolean>(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [position, setPosition] = useState<LatLngExpression>();
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const query = {
    query: `
    query {
      seedlings {
          _id
          species
          plantedQuantity
          survivedQuantity
          datePlanted
          location
      }
    }`,
  };

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
    axios({
      url: "http://localhost:3000/graphql",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${sessionStorage.getItem("token")}`,
      },
      method: "POST",
      data: JSON.stringify(query),
    })
      .then((result) => {
        setSeedlings(result.data.data.seedlings);
        setLoadingState(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Fragment>
      <Navigation />
      <div className={styles.Map}>
        {loading && (
          <Fragment>
            <Backdrop></Backdrop>
            <Spinner></Spinner>
          </Fragment>
        )}
        {!loading && <Map position={position} seedlings={seedlings} />}
      </div>
    </Fragment>
  );
};

export default mapPage;
