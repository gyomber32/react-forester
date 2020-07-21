import React, { Fragment, useState, useEffect } from "react";

import Card from "../../components/Card/Card";
import DetailsModal from "../../components/DetailsModal/DetailsModal";
import AddModal from "../../components/AddModal/AddModal";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import Backdrop from "../../components/Backdrop/Backdrop";
import AddButton from "../../components/AddButton/AddButton";
import Navigation from "../../components/Navigation/Navigation";
import Popup from "../../components/Popup/Popup";
import Spinner from "../../components/Spinner/Spinner";
import Chart from "../../components/Chart/Chart";
import NoData from "../../components/NoData/NoData";

import Seedling from "../../models/types/Seedling";
import PopUp from "../../models/types/PopUp";

import {
  getAllSeedlings,
  getOneSeedling,
  removeSeedling,
  createSeedling,
} from "../../api/index";

import styles from "./Seedlings.module.scss";

const SeedlingsPage: React.FC = () => {
  const [seedlings, setSeedlings] = useState<Seedling[]>([]);

  const [selectedSeedling, setSelectedSeedling] = useState<Seedling>({
    _id: "",
    species: "",
    plantedQuantity: 0,
    survivedQuantity: 0,
    datePlanted: "",
    daysInSoil: "",
    picture: "",
    pictureId: "",
    location: "",
  });

  const [detailsModal, setDetailsModalState] = useState<boolean>(false);

  const [addModal, setAddModalState] = useState<boolean>(false);

  const [popup, setPopup] = useState<PopUp>({ isOpen: false, message: "" });

  const [loading, setLoadingState] = useState<boolean>(false);

  const [confirmationModal, setConfirmationModalState] = useState<boolean>(
    false
  );

  const fetchOneSeedling = async (id: string) => {
    setLoadingState(true);
    try {
      const seedling = await getOneSeedling(id);
      setSeedlings([...seedlings, seedling]);
    } catch (error) {
      setPopup({
        isOpen: true,
        message: error.message,
      });
      setTimeout(() => {
        setPopup({ isOpen: false, message: "" });
      }, 5500);
      console.log(error);
    }
    setLoadingState(false);
  };

  const fetchAllSeedlings = async () => {
    setLoadingState(true);
    try {
      const trees = await getAllSeedlings();
      setSeedlings(trees);
    } catch (error) {
      setPopup({
        isOpen: true,
        message: error.message,
      });
      setTimeout(() => {
        setPopup({ isOpen: false, message: "" });
      }, 5500);
      console.log(error);
    }
    setLoadingState(false);
  };

  useEffect(() => {
    fetchAllSeedlings();
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
      species: "",
      plantedQuantity: 0,
      survivedQuantity: 0,
      datePlanted: "",
      daysInSoil: "",
      picture: "",
      pictureId: "",
      location: "",
    });
  };

  const openAddModal = () => {
    setAddModalState(true);
  };

  const closeAddModal = () => {
    setAddModalState(false);
  };

  const openConfirmationModal = () => {
    setConfirmationModalState(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationModalState(false);
    if (detailsModal) {
      closeDetailsModal();
    }
  };

  const deleteSeedling = async () => {
    setLoadingState(true);
    closeConfirmationModal();
    try {
      const responseMessage = await removeSeedling(selectedSeedling);
      await fetchAllSeedlings();
      setPopup({
        isOpen: true,
        message: responseMessage,
      });
      setTimeout(() => {
        setPopup({ isOpen: false, message: "" });
      }, 5500);
    } catch (error) {
      setPopup({ isOpen: true, message: error.message });
      setTimeout(() => {
        setPopup({ isOpen: false, message: "" });
      }, 5500);
      console.log(error);
    }
    setLoadingState(false);
  };

  const onSubmit = async (value: any) => {
    setLoadingState(true);
    value.survivedQuantity = value.plantedQuantity;
    try {
      const id = await createSeedling(value);
      await fetchOneSeedling(id);
      setPopup({ isOpen: true, message: "Seedling created successfully" });
      setTimeout(() => {
        setPopup({ isOpen: false, message: "" });
      }, 5500);
    } catch (error) {
      setPopup({ isOpen: true, message: error.message });
      setTimeout(() => {
        setPopup({ isOpen: false, message: "" });
      }, 5500);
      console.log(error);
    }
    setLoadingState(false);
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
        {popup.isOpen && <Popup message={popup.message}></Popup>}
        {!loading && seedlings.length > 0 && (
          <Fragment>
            <div className={styles.Seedlings_cardsContainer}>
              {seedlings.map((item: Seedling) => (
                <Card
                  key={item._id}
                  species={item.species}
                  picture={item.picture}
                  survivedQuantity={item.survivedQuantity}
                  click={() => openDetailsModal(item._id)}
                />
              ))}
            </div>
            <Chart length={seedlings.length} data={seedlings}></Chart>
          </Fragment>
        )}
        {!loading && seedlings.length === 0 && <NoData>seedlings</NoData>}
        {detailsModal && <Backdrop click={closeDetailsModal}></Backdrop>}
        {detailsModal && (
          <DetailsModal
            species={selectedSeedling.species}
            picture={selectedSeedling.picture}
            plantedQuantity={selectedSeedling.plantedQuantity}
            survivedQuantity={selectedSeedling.survivedQuantity}
            datePlanted={selectedSeedling.datePlanted}
            daysInSoil={selectedSeedling.daysInSoil}
            openConfirmationModal={openConfirmationModal}
          ></DetailsModal>
        )}
        {confirmationModal && (
          <Fragment>
            <Backdrop click={closeConfirmationModal} zIndex={3}></Backdrop>
            <ConfirmationModal
              onYes={deleteSeedling}
              onCancel={closeConfirmationModal}
            ></ConfirmationModal>
          </Fragment>
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
