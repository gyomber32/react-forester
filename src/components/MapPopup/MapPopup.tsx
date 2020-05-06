import React, { Fragment, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LatLngExpression, LatLng, Icon } from "leaflet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import getPosition from "../../utils/Position";

import manSvg from "../../assets/icons/man.svg";

import styles from "./MapPopup.module.scss";

const manIcon = new Icon({
  iconUrl: manSvg,
  iconSize: [50, 50],
});

type Props = {
  name: string;
  //handleMapClick: any;
  handleBlur: any;
  setFieldValue: any;
  onChange: any;
  //value: any;
};

const LocationField: React.FC<Props> = (props) => {
  const [position, setPosition] = useState<LatLng>();

  const [mapPopup, setMapPopup] = useState<boolean>(false);

  const handleMapClick = (e: any) => {
    console.log(e.latlng);
    setPosition(e.latlng);
    return "sadadasdasd";
  };

  const openMap = () => {
    getPosition()
      .then((position) => {
        return position;
      })
      .then((position) => {
        setPosition(
          new LatLng(position.coords.latitude, position.coords.longitude)
        );
        setMapPopup(!mapPopup);
      });
  };

  const closeMapPopup = () => {
    setMapPopup(false);
  };

  return (
    <Fragment>
      <Field
        name="latlng"
        type="text"
        placeholder="Location"
        className={styles.AddModal_form_field}
        value={position ? `${position.lat}, ${position.lng}` : ""}
        onClick={openMap}
        onChange={() => props.setFieldValue("latlng", handleMapClick)}
        onBlur={props.handleBlur}
      />
      {mapPopup && (
        <div className={styles.MapPopup}>
          <div className={styles.MapPopup_closeButton} onClick={closeMapPopup}>
            <i className={styles.MapPopup_closeButton___icon}></i>
          </div>
          <div className={styles.Map}>
            <Map
              center={position}
              style={{ height: "240px", width: "240px" }}
              zoom={13}
              onclick={handleMapClick}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* <Marker position={position} icon={manIcon}>
                <Popup>
                  <span>You are here</span>
                </Popup>
              </Marker> */}
            </Map>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default LocationField;
