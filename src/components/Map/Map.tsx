import React, { Fragment } from "react";
import { LatLngExpression, Icon } from "leaflet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import Seedling from "../../models/types/Seedling";

import manSvg from "../../assets/icons/man.svg";
import treeSvg from "../../assets/icons/tree.svg";

import "leaflet/dist/leaflet.css";
import styles from "./Map.module.scss";

const manIcon = new Icon({
  iconUrl: manSvg,
  iconSize: [50, 50],
});

const treeIcon = new Icon({
  iconUrl: treeSvg,
  iconSize: [50, 50],
});

type Props = {
  position: LatLngExpression | undefined;
  seedlings?: Seedling[];
};

const map: React.FC<Props> = (props) => {
  const marker = props.position ? (
    <Marker position={props.position} icon={manIcon}>
      <Popup>
        <span>You are here</span>
      </Popup>
    </Marker>
  ) : null;

  const markers = props.seedlings
    ? props.seedlings.map((seedling) => {
        return (
          <Marker key={seedling.id} position={seedling.latlng} icon={treeIcon}>
            <Popup>
              <span>
                Species: <b>{seedling.species}</b>
                <br></br>
                Piece: <b>{seedling.piece}</b>
                <br></br>
                Date planted: <b>{seedling.datePlanted}</b>
              </span>
            </Popup>
          </Marker>
        );
      })
    : null;

  const asd = { lat: 45.896707, lng: 20.153758 };

  return (
    <Fragment>
      {props.seedlings && (
        <Map
          center={asd}
          style={{ height: "800px", width: "800px" }}
          // onclick={this.handleClick}
          zoom={13}
        >
          {markers}
          <TileLayer
            attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />{" "}
          {marker}
        </Map>
      )}
      {!props.seedlings && (
        <Map
          center={props.position}
          style={{ height: "800px", width: "800px" }}
          // onclick={this.handleClick}
          zoom={13}
        >
          <TileLayer
            attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />{" "}
          {marker}
        </Map>
      )}
    </Fragment>
  );
};

export default map;
