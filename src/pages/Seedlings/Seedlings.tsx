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

import Seedling from "../../models/types/Seedling";

import axios from "axios";

import styles from "./Seedlings.module.scss";

const SeedlingsPage: React.FC = () => {
  const [seedlings, setSeedlings] = useState<Seedling[]>([]);

  const [selectedSeedling, setSelectedSeedling] = useState<Seedling>({
    _id: "",
    picture: "",
    species: "",
    plantedQuantity: 0,
    survivedQuantity: 0,
    datePlanted: "",
    location: "",
  });

  const [detailsModal, setDetailsModalState] = useState<boolean>(false);

  const [addModal, setAddModalState] = useState<boolean>(false);

  const [popup, setPopupState] = useState<boolean>(false);

  const [loading, setLoadingState] = useState<boolean>(false);

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

  useEffect(() => {
    setLoadingState(true);
    axios({
      url: "http://localhost:3000/graphql",
      headers: { "Content-Type": "application/json" },
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

  const openDetailsModal = (id: string) => {
    const seedling = seedlings.filter((seedling) => seedling._id === id);
    setSelectedSeedling(seedling[0]);
    setDetailsModalState(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalState(false);
    setSelectedSeedling({
      _id: "",
      picture: "",
      species: "",
      plantedQuantity: 0,
      survivedQuantity: 0,
      datePlanted: "",
      location: "",
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
      value._id = seedlings[seedlings.length - 1]._id + 1;
      value.datePlanted = value.datePlanted.toDateString();
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
              plantedQuantity={selectedSeedling.plantedQuantity}
              survivedQuantity={selectedSeedling.survivedQuantity}
              datePlanted={selectedSeedling.datePlanted}
            ></DetailsModal>
          )}
          {seedlings.map((item: Seedling) => (
            <Card
              key={item._id}
              species={item.species}
              picture={item.picture}
              plantedQuantity={item.plantedQuantity}
              survivedQuantity={item.survivedQuantity}
              click={() => openDetailsModal(item._id)}
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
