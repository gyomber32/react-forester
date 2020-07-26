import React, { Fragment, useState } from "react";
import { Icon } from "leaflet";
import { Map, Marker, TileLayer } from "react-leaflet";

import treeSvg from "../../assets/icons/tree.svg";

import styles from "./LocationField.module.scss";
import { usePosition } from "../../hooks";

const treeIcon = new Icon({
  iconUrl: treeSvg,
  iconSize: [50, 50],
});

type Props = {
  className: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onValueChange: any;
};

const LocationField: React.FC<Props> = (props) => {
  const { position, setPosition, error } = usePosition();
  const [mapPopup, setMapPopup] = useState<boolean>(false);

  const handleMapClick = (e: any) => {
    if (e.latlng !== undefined) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
      props.onValueChange(`${e.latlng.lat}, ${e.latlng.lng}`);
    }
  };

  const openMap = () => {
    setMapPopup(!mapPopup);
  };

  const closeMapPopup = () => {
    setMapPopup(false);
  };

  return (
    <Fragment>
      <input
        className={props.className}
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        readOnly={true}
        onClick={openMap}
        placeholder={props.placeholder}
      ></input>
      {mapPopup && (
        <div className={styles.MapPopup}>
          <div className={styles.MapPopup_closeButton} onClick={closeMapPopup}>
            <i className={styles.MapPopup_closeButton___icon}></i>
          </div>
          <div className={styles.Map}>
            <Map
              center={position!}
              style={{ height: "240px", width: "240px" }}
              zoom={13}
              onclick={handleMapClick}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position!} icon={treeIcon}></Marker>
            </Map>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default LocationField;
