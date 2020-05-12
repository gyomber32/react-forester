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
import NoData from "../../components/NoData/NoData";

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
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      data: JSON.stringify(query),
    })
      .then((result) => {
        setLoadingState(false);
        setSeedlings(result.data.data.seedlings);
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
    value.survivedQuantity = value.plantedQuantity;
    const mutation = {
      query: `
        mutation {
          createSeedling(seedlingInput: {species: "${value.species}", plantedQuantity: ${value.plantedQuantity}, survivedQuantity: ${value.survivedQuantity}, datePlanted: "${value.datePlanted}", location: "${value.location}", picture: "${value.picture}"}) {
            _id
            species
            plantedQuantity
            survivedQuantity
            datePlanted
            location
            picture
          }
        }`,
    };
    axios({
      url: "http://localhost:3000/graphql",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      data: JSON.stringify(mutation),
    })
      .then(() => {
        closeAddModal();
        setPopupState(true);
        setTimeout(() => {
          setPopupState(false);
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
      });
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
          {!loading && seedlings.length > 0 && (
            <Fragment>
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
              <Chart length={seedlings.length} data={seedlings}></Chart>
            </Fragment>
          )}
        </div>
        {!loading && seedlings.length === 0 && <NoData>seedlings</NoData>}
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
