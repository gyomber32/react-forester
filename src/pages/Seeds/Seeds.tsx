import React, { useState, Fragment, useEffect, useCallback } from "react";

import Navigation from "../../components/Navigation/Navigation";
import Table from "../../components/Table/Table";
import AddModal from "../../components/AddModal/AddModal";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import AddButton from "../../components/AddButton/AddButton";
import Popup from "../../components/Popup/Popup";
import Backdrop from "../../components/Backdrop/Backdrop";
import Spinner from "../../components/Spinner/Spinner";
import Chart from "../../components/Chart/Chart";
import NoData from "../../components/NoData/NoData";

import Seed from "../../models/types/Seed";
import PopUp from "../../models/types/PopUp";

import { getOneSeed, getAllSeeds, removeSeed, createSeed } from "../../api";

import styles from "./Seeds.module.scss";

const SeedsPage: React.FC = () => {
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [selectedSeed, setSelectedSeed] = useState<Seed>({
    _id: "",
    species: "",
    seededQuantity: 0,
    brairdedQuantity: 0,
    dateSeeded: "",
    daysInSoil: "",
  });
  const [addModal, setAddModalState] = useState<boolean>(false);
  const [popup, setPopup] = useState<PopUp>({ isOpen: false, message: "" });
  const [loading, setLoadingState] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModalState] = useState<boolean>(
    false
  );

  const fetchOneSeed = async (id: string) => {
    setLoadingState(true);
    try {
      const seed = await getOneSeed(id);
      setSeeds([...seeds, seed]);
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

  const fetchAllSeeds = async () => {
    setLoadingState(true);
    try {
      const seeds = await getAllSeeds();
      setSeeds(seeds);
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
    fetchAllSeeds();
  }, []);

  const openAddModal = () => {
    setAddModalState(true);
  };

  const closeAddModal = () => {
    setAddModalState(false);
  };

  const openConfirmationModal = (seed: Seed) => {
    setSelectedSeed(seed);
    setConfirmationModalState(true);
  };

  const closeConfirmationModal = () => {
    setSelectedSeed({
      _id: "",
      species: "",
      seededQuantity: 0,
      brairdedQuantity: 0,
      dateSeeded: "",
      daysInSoil: "",
    });
    setConfirmationModalState(false);
  };

  const deleteSeed = useCallback(async () => {
    setLoadingState(true);
    closeConfirmationModal();
    try {
      const responseMessage = await removeSeed(selectedSeed);
      await fetchAllSeeds();
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
  }, [selectedSeed]);

  const onSubmit = async (seed: any) => {
    setLoadingState(true);
    closeAddModal();
    seed.brairdedQuantity = seed.seededQuantity;
    try {
      const id = await createSeed(seed);
      await fetchOneSeed(id);
      setPopup({ isOpen: true, message: "Seed created successfully" });
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
      {console.log("Seeds page rerender")}
      <div className={styles.Seeds}>
        {loading && (
          <Fragment>
            <Backdrop></Backdrop>
            <Spinner></Spinner>
          </Fragment>
        )}
        {popup.isOpen && <Popup message={popup.message}></Popup>}
        {!loading && seeds.length > 0 && (
          <div className={styles.Seeds_seedsContainer}>
            <Fragment>
              <Table
                seeds={seeds}
                onDelete={openConfirmationModal}
                onUpdate={() => {}}
              ></Table>
              <Chart length={seeds.length} data={seeds}></Chart>
            </Fragment>
          </div>
        )}
        {!loading && seeds.length === 0 && <NoData>seeds</NoData>}
        {confirmationModal && (
          <Fragment>
            <Backdrop click={closeConfirmationModal} zIndex={3}></Backdrop>
            <ConfirmationModal
              onYes={deleteSeed}
              onCancel={closeConfirmationModal}
            ></ConfirmationModal>
          </Fragment>
        )}
        {addModal && (
          <Fragment>
            <Backdrop click={closeAddModal}></Backdrop>
            <AddModal type="seeds" onSubmit={onSubmit} onCancel={closeAddModal}>
              seed
            </AddModal>
          </Fragment>
        )}
        <AddButton click={openAddModal}></AddButton>
      </div>
    </Fragment>
  );
};

export default SeedsPage;
