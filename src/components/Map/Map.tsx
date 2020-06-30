import React, { Fragment } from "react";
import { LatLngExpression, Icon, LatLng } from "leaflet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

import Tree from "../../models/types/Tree";

import manSvg from "../../assets/icons/man.svg";
import treeSvg from "../../assets/icons/tree.svg";

import "leaflet/dist/leaflet.css";

import parseDate from "../../utils/ParseDate";

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
  trees?: Tree[];
};

const map: React.FC<Props> = (props) => {
  const marker = props.position ? (
    <Marker position={props.position} icon={manIcon}>
      <Popup>
        {props.trees ? (
          <span>You are here</span>
        ) : (
          <span>
            Every child needs to learn how to cook, needs to learn how to
            cultivate a garden, plant seeds, learn about sustainability, be
            taken to a garden, and be able to put hands in the earth.
          </span>
        )}
      </Popup>
    </Marker>
  ) : null;

  const markers = props.trees
    ? props.trees.map((tree) => {
        return (
          <Marker key={tree._id} position={new LatLng(+tree.location.split(',')[0],+tree.location.split(',')[1])} icon={treeIcon}>
            <Popup>
              <span>
                Species: <b>{tree.species}</b>
                <br></br>
                Planted: <b>{tree.plantedQuantity}</b>
                <br></br>
                Survived: <b>{tree.survivedQuantity}</b>
                <br></br>
                Date planted: <b>{tree.datePlanted}</b>
                <br></br>
                Growing for: <b>{parseDate(tree.datePlanted)}</b>
              </span>
            </Popup>
          </Marker>
        );
      })
    : null;

  return (
    <Fragment>
      <Map
        center={props.position}
        style={{ height: "800px", width: "800px" }}
        // onclick={this.handleClick}
        zoomControl={markers ? true : false}
        scrollWheelZoom={markers ? true : false}
        doubleClickZoom={markers ? true : false}
        dragging={markers ? true : false}
        zoom={13}
      >
        {markers ? (
          markers
        ) : (
          <TileLayer
            url={
              "https://www.mandlpaints.com/wp-content/uploads/2018/09/Lead-Gray.jpg"
            }
            opacity={0.9}
            zIndex={1}
          />
        )}
        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          zIndex={0}
        />
        {marker}
      </Map>
      )}
    </Fragment>
  );
};

export default map;
