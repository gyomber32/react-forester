import { LatLng } from "leaflet";

type Seedling = {
    id: string;
    species: string;
    piece: number;
    datePlanted: string;
    picture: string;
    latlng: LatLng;
};

export default Seedling;
