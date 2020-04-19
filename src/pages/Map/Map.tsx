import React, { Fragment, useEffect, useState } from "react";
import { LatLngExpression, LatLng } from "leaflet";

import Map from "../../components/Map/Map";
import Navigation from "../../components/Navigation/Navigation";

import styles from "./Map.module.scss";

import avatar0 from "../../assets/oak_seedling.jpg";
import avatar1 from "../../assets/red-oak_seedling.jpg";
import avatar2 from "../../assets/willow_seedling.jpg";
import avatar3 from "../../assets/aesculus_seedling.jpg";
import avatar4 from "../../assets/ulmus-minor_seedling.jpg";

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
  useEffect(() => {
    setLoadingState(true);
    getPosition().then((position) => {
      return new LatLng(
        position.coords.latitude,
        position.coords.longitude
      );
    }).then(position => {
      setPosition(position);
    });
    setTimeout(() => {
      setSeedlings([
        {
          id: "0",
          picture: avatar0,
          species: "Oak",
          piece: 50,
          datePlanted: new Date("2018-06-04").toDateString(),
          latlng: new LatLng(45.896707, 20.153758),
        },
        {
          id: "1",
          picture: avatar1,
          species: "Red oak",
          piece: 30,
          datePlanted: new Date("2019-08-20").toDateString(),
          latlng: new LatLng(45.896892, 20.154347),
        },
        {
          id: "2",
          picture: avatar2,
          species: "Willow",
          piece: 50,
          datePlanted: new Date("2020-03-07").toDateString(),
          latlng: new LatLng(45.896827, 20.153663),
        },
        {
          id: "3",
          picture: avatar3,
          species: "Aesculus",
          piece: 5,
          datePlanted: new Date("2019-05-11").toDateString(),
          latlng: new LatLng(45.897503, 20.155034),
        },
        {
          id: "4",
          picture: avatar4,
          species: "Ulmus minor (Field elm)",
          piece: 5,
          datePlanted: new Date("2019-10-12").toDateString(),
          latlng: new LatLng(45.897481, 20.150477),
        },
      ]);
      setLoadingState(false);
    }, 2000);
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
        {!loading && <Map position={position} seedlings={seedlings}/>}
      </div>
    </Fragment>
  );
};

export default mapPage;
