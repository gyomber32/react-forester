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

import { useFetchSeed } from "../../hooks";

import styles from "./Seeds.module.scss";

const SeedsPage: React.FC = () => {
  const [selectedSeed, setSelectedSeed] = useState<Seed>({} as Seed);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  const { seeds, isLoading, popup, fetchSeed } = useFetchSeed();

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

  const deleteSeed = useCallback(async () => {
    fetchSeed("DELETE", selectedSeed);
    closeConfirmationModal();
  }, [closeConfirmationModal, fetchSeed, selectedSeed]);

  const createSeed = useCallback(
    async (seed: Seed) => {
      fetchSeed("CREATE", seed);
      closeAddModal();
    },
    [fetchSeed, closeAddModal]
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
              onYes={deleteSeed}
              onCancel={closeConfirmationModal}
            ></ConfirmationModal>
          </Fragment>
        )}
        {addModal && (
          <Fragment>
            <Backdrop click={closeAddModal}></Backdrop>
            <AddModal
              type="seeds"
              onSubmit={createSeed}
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
