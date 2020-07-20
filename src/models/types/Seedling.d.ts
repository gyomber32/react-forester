import { LatLng } from "leaflet";

type Seedling = {
    _id: string;
    species: string;
    plantedQuantity: number;
    survivedQuantity: number;
    datePlanted: string;
    daysInSoil: string;
    picture: string;
    location: string;
};

export default Seedling;
