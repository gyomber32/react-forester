import React from "react";
import { LatLngExpression, Icon, LatLng } from "leaflet";
import { Map, Marker, Popup, TileLayer, LayersControl } from "react-leaflet";

import Tree from "../../models/types/Tree";

import manSvg from "../../assets/icons/man.svg";
import treeSvg from "../../assets/icons/tree.svg";
import seedlingSvg from "../../assets/icons/seedling.svg";

import "leaflet/dist/leaflet.css";
import Seedling from "../../models/types/Seedling";

const manIcon = new Icon({
  iconUrl: manSvg,
  iconSize: [50, 50],
});

const treeIcon = new Icon({
  iconUrl: treeSvg,
  iconSize: [50, 50],
});

const seedlingIcon = new Icon({
  iconUrl: seedlingSvg,
  iconSize: [50, 50],
});

type Props = {
  position: LatLngExpression | undefined;
  trees?: Tree[];
  seedlings?: Seedling[];
  size: { height: number; width: number };
};

const map: React.FC<Props> = (props) => {
  const marker = props.position ? (
    <Marker position={props.position} icon={manIcon}>
      <Popup>
        {props.trees?.length! > 0 ? (
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

  const treeMarkers = props.trees
    ? props.trees.map((tree) => {
        return (
          <Marker
            key={tree._id}
            position={
              new LatLng(
                +tree.location.split(",")[0],
                +tree.location.split(",")[1]
              )
            }
            icon={treeIcon}
          >
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
                Growing for: <b>{tree.daysInSoil}</b>
              </span>
            </Popup>
          </Marker>
        );
      })
    : null;

  const seedlingMarkers = props.seedlings
    ? props.seedlings.map((seedling) => {
        return (
          <Marker
            key={seedling._id}
            position={
              new LatLng(
                +seedling.location.split(",")[0],
                +seedling.location.split(",")[1]
              )
            }
            icon={seedlingIcon}
          >
            <Popup>
              <span>
                Species: <b>{seedling.species}</b>
                <br></br>
                Planted: <b>{seedling.plantedQuantity}</b>
                <br></br>
                Survived: <b>{seedling.survivedQuantity}</b>
                <br></br>
                Date planted: <b>{seedling.datePlanted}</b>
                <br></br>
                Growing for: <b>{seedling.daysInSoil}</b>
              </span>
            </Popup>
          </Marker>
        );
      })
    : null;

  const markers = treeMarkers?.concat(seedlingMarkers!);

  return (
    <Map
      center={props.position}
      style={{ height: props.size.height, width: props.size.width }}
      zoomControl={markers ? true : false}
      scrollWheelZoom={markers ? true : false}
      doubleClickZoom={markers ? true : false}
      dragging={markers ? true : false}
      zoom={5}
      maxZoom={18}
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
      <LayersControl position="topright">
        <LayersControl.Overlay name="Countries">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Temperature">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=dead7a611296ce5fbff383dee7cfa112"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Clouds">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=dead7a611296ce5fbff383dee7cfa112"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Precipitation">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=dead7a611296ce5fbff383dee7cfa112"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Wind">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=dead7a611296ce5fbff383dee7cfa112"
          />
        </LayersControl.Overlay>
      </LayersControl>
      <TileLayer
        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
      />
      {marker}
    </Map>
  );
};

export default React.memo(map);
