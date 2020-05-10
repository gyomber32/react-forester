import React, { Fragment, useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import DetailsModal from "../../components/DetailsModal/DetailsModal";
import AddModal from "../../components/AddModal/AddModal";
import Backdrop from "../../components/Backdrop/Backdrop";
import AddButton from "../../components/AddButton/AddButton";
import Navigation from "../../components/Navigation/Navigation";
import Popup from "../../components/Popup/Popup";
import Spinner from "../../components/Spinner/Spinner";
import Chart from "../../components/Chart/Chart";

import { LatLng } from "leaflet";

import Seedling from "../../models/types/Seedling";

import styles from "./Seedlings.module.scss";

import avatar0 from "../../assets/oak_seedling.jpg";
import avatar1 from "../../assets/red-oak_seedling.jpg";
import avatar2 from "../../assets/willow_seedling.jpg";
import avatar3 from "../../assets/aesculus_seedling.jpg";
import avatar4 from "../../assets/ulmus-minor_seedling.jpg";

const SeedlingsPage: React.FC = () => {
  const [seedlings, setSeedlings] = useState<Seedling[]>([]);

  const [selectedSeedling, setSelectedSeedling] = useState<Seedling>({
    id: "",
    picture: "",
    species: "",
    piece: 0,
    datePlanted: "",
    latlng: new LatLng(0, 0),
  });

  const [detailsModal, setDetailsModalState] = useState<boolean>(false);

  const [addModal, setAddModalState] = useState<boolean>(false);

  const [popup, setPopupState] = useState<boolean>(false);

  const [loading, setLoadingState] = useState<boolean>(false);

  useEffect(() => {
    setLoadingState(true);
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

  const openDetailsModal = (id: string) => {
    const seedling = seedlings.filter((seedling) => seedling.id === id);
    setSelectedSeedling(seedling[0]);
    setDetailsModalState(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalState(false);
    setSelectedSeedling({
      id: "",
      picture: "",
      species: "",
      piece: 0,
      datePlanted: "",
      latlng: new LatLng(0, 0),
    });
  };

  const openAddModal = () => {
    setAddModalState(true);
  };

  const closeAddModal = () => {
    setAddModalState(false);
  };

  const onSubmit = (value: any) => {
    setTimeout(() => {
      // needs to be deleted after values will be fecthed from the backend
      value.id = seedlings[seedlings.length - 1].id + 1;
      value.datePlanted = value.datePlanted.toDateString();
      console.log(value);
      const newSeedlings = seedlings;
      newSeedlings.push(value);
      setSeedlings(newSeedlings);
      closeAddModal();
    }, 1000);
    setTimeout(() => {
      setPopupState(true);
    }, 1000);
    setTimeout(() => {
      setPopupState(false);
    }, 5000);
  };

  return (
    <Fragment>
      <Navigation />
      <div className={styles.Seedlings}>
        {loading && (
          <Fragment>
            <Backdrop></Backdrop>
            <Spinner></Spinner>
          </Fragment>
        )}
        {popup && <Popup>Successfully added to database</Popup>}
        <div className={styles.Seedlings_cardsContainer}>
          {detailsModal && <Backdrop click={closeDetailsModal}></Backdrop>}
          {detailsModal && (
            <DetailsModal
              species={selectedSeedling.species}
              picture={selectedSeedling.picture}
              piece={selectedSeedling.piece}
              datePlanted={selectedSeedling.datePlanted}
            ></DetailsModal>
          )}
          {seedlings.map((item: Seedling) => (
            <Card
              key={item.id}
              species={item.species}
              picture={item.picture}
              piece={item.piece}
              click={() => openDetailsModal(item.id)}
            />
          ))}
        </div>
        {!loading && <Chart length={seedlings.length} data={seedlings}></Chart>}
        {addModal && <Backdrop click={closeAddModal}></Backdrop>}
        {addModal && (
          <AddModal
            type="seedlings"
            onSubmit={onSubmit}
            onCancel={closeAddModal}
          >
            seedling
          </AddModal>
        )}
        <AddButton click={openAddModal}></AddButton>
      </div>
    </Fragment>
  );
};

export default SeedlingsPage;
