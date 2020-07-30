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

import {
  useFetchAllSeeds,
  useCreateSeed,
  useDeleteSeed,
} from "../../hooks/seed";
import { useSeeds, useLoader, usePopup } from "../../hooks/store";

import Seed from "../../models/types/Seed";

import styles from "./Seeds.module.scss";

const SeedsPage: React.FC = () => {
  const [selectedSeed, setSelectedSeed] = useState<Seed>({} as Seed);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  const fetchSeeds = useFetchAllSeeds();
  const createSeed = useCreateSeed();
  const deleteSeed = useDeleteSeed();
  const seeds = useSeeds();
  const isLoading = useLoader();
  const popup = usePopup();

  const openAddModal = useCallback(() => {
    setAddModal(true);
  }, []);

  const closeAddModal = useCallback(() => {
    setAddModal(false);
  }, []);

  const openConfirmationModal = useCallback((seed: Seed) => {
    setSelectedSeed(seed);
    setConfirmationModal(true);
  }, []);

  const closeConfirmationModal = useCallback(() => {
    setConfirmationModal(false);
  }, []);

  const deleteSeedHandler = useCallback(async () => {
   deleteSeed(selectedSeed);
    closeConfirmationModal();
  }, [closeConfirmationModal, deleteSeed, selectedSeed]);

  const createSeedHandler = useCallback(
    async (seed: Seed) => {
      createSeed(seed);
      closeAddModal();
    },
    [closeAddModal, createSeed]
  );

  const closeOnEscapeButton = useCallback(
    (event?: any) => {
      if (event.keyCode === 27) {
        if (addModal) closeAddModal();
        if (confirmationModal) closeConfirmationModal();
      }
    },
    [addModal, confirmationModal, closeAddModal, closeConfirmationModal]
  );

  useEffect(() => {
    fetchSeeds();
  }, [fetchSeeds]);

  useEffect(() => {
    document.addEventListener("keydown", closeOnEscapeButton, false);
  }, [closeOnEscapeButton]);

  return (
    <Fragment>
      <Navigation />
      <div className={styles.Seeds}>
        {isLoading && (
          <Fragment>
            <Backdrop></Backdrop>
            <Spinner></Spinner>
          </Fragment>
        )}
        {popup.isOpen && <Popup message={popup.message}></Popup>}
        {!isLoading && seeds.length > 0 && (
          <div className={styles.Seeds_seedsContainer}>
            <Fragment>
              <Table
                seeds={seeds}
                onDelete={openConfirmationModal}
                onUpdate={() => {}}
              ></Table>
              <Chart data={seeds}></Chart>
            </Fragment>
          </div>
        )}
        {!isLoading && seeds.length === 0 && <NoData>seeds</NoData>}
        {confirmationModal && (
          <Fragment>
            <Backdrop click={closeConfirmationModal} zIndex={3}></Backdrop>
            <ConfirmationModal
              onYes={deleteSeedHandler}
              onCancel={closeConfirmationModal}
            ></ConfirmationModal>
          </Fragment>
        )}
        {addModal && (
          <Fragment>
            <Backdrop click={closeAddModal}></Backdrop>
            <AddModal
              type="seeds"
              onSubmit={createSeedHandler}
              onCancel={closeAddModal}
            >
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
