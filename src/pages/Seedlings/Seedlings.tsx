import React, { Fragment, useState, useEffect, useCallback } from "react";

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

import {
  useFetchAllSeedlings,
  useCreateSeedling,
  useDeleteSeedling,
} from "../../hooks/seedling";
import { useSeedlings, useLoader, usePopup } from "../../hooks";

import styles from "./Seedlings.module.scss";

const SeedlingsPage: React.FC = () => {
  const [selectedSeedling, setSelectedSeedling] = useState<Seedling>(
    {} as Seedling
  );
  const [detailsModal, setDetailsModal] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [migrateModal, setMigrateModal] = useState<boolean>(false);
  const fetchSeedlings = useFetchAllSeedlings();
  const createSeedling = useCreateSeedling();
  const deleteSeedling = useDeleteSeedling();
  const seedlings = useSeedlings();
  const isLoading = useLoader();
  const popup = usePopup();

  const openDetailsModal = useCallback(
    (seedling: Seedling) => {
      setSelectedSeedling(seedling);
      setDetailsModal(true);
    },
    [setSelectedSeedling, setDetailsModal]
  );

  const closeDetailsModal = useCallback(() => {
    setDetailsModal(false);
    setSelectedSeedling({} as Seedling);
  }, [setDetailsModal]);

  const openAddModal = useCallback(() => {
    setAddModal(true);
  }, [setAddModal]);

  const closeAddModal = useCallback(() => {
    setAddModal(false);
  }, [setAddModal]);

  const openMigrateModal = useCallback(() => {}, []);

  const openDeleteModal = useCallback(() => {
    console.log(1);
    setDeleteModal(true);
  }, [setDeleteModal]);

  const closeDeleteModal = useCallback(() => {
    setDeleteModal(false);
    if (detailsModal) {
      closeDetailsModal();
    }
  }, [closeDetailsModal, detailsModal]);

  const deleteSeedlingHandeler = useCallback(async () => {
    deleteSeedling(selectedSeedling);
    closeDeleteModal();
    closeDetailsModal();
  }, [closeDeleteModal, closeDetailsModal, deleteSeedling, selectedSeedling]);

  const createSeedlingHandler = useCallback(
    async (seedling: Seedling) => {
      createSeedling(seedling);
      closeAddModal();
    },
    [closeAddModal, createSeedling]
  );

  const closeOnEscapeButton = useCallback(
    (event?: any) => {
      if (event.keyCode === 27) {
        if (detailsModal) closeDetailsModal();
        if (addModal) closeAddModal();
        if (deleteModal) closeDeleteModal();
      }
    },
    [
      addModal,
      deleteModal,
      detailsModal,
      closeAddModal,
      closeDeleteModal,
      closeDetailsModal,
    ]
  );

  useEffect(() => {
    fetchSeedlings();
  }, [fetchSeedlings]);

  useEffect(() => {
    document.addEventListener("keydown", closeOnEscapeButton, false);
  }, [closeOnEscapeButton]);

  return (
    <Fragment>
      <Navigation />
      <div className={styles.Seedlings}>
        {isLoading && (
          <Fragment>
            <Backdrop></Backdrop>
            <Spinner></Spinner>
          </Fragment>
        )}
        {popup.isOpen && <Popup message={popup.message}></Popup>}
        {!isLoading && seedlings.length > 0 && (
          <Fragment>
            <div className={styles.Seedlings_cardsContainer}>
              {seedlings.map((seedling: Seedling) => (
                <Card
                  key={seedling._id}
                  species={seedling.species}
                  picture={seedling.picture}
                  survivedQuantity={seedling.survivedQuantity}
                  click={() => openDetailsModal(seedling)}
                />
              ))}
            </div>
            <Chart data={seedlings}></Chart>
          </Fragment>
        )}
        {!isLoading && seedlings.length === 0 && <NoData>seedlings</NoData>}
        {detailsModal && (
          <Fragment>
            <Backdrop click={closeDetailsModal}></Backdrop>
            <DetailsModal
              type='seedling'
              item={selectedSeedling}
              handleDelete={openDeleteModal}
              handleUpdate={() => {}}
              handleMigrate={() => {}}
            ></DetailsModal>
          </Fragment>
        )}
        {deleteModal && (
          <Fragment>
            <Backdrop click={closeDeleteModal} zIndex={3}></Backdrop>
            <ConfirmationModal
              actionType="delete"
              itemType="seedling"
              onYes={deleteSeedlingHandeler}
              onCancel={closeDeleteModal}
            ></ConfirmationModal>
          </Fragment>
        )}
        {addModal && (
          <Fragment>
            <Backdrop click={closeAddModal}></Backdrop>
            <AddModal
              type="seedlings"
              onSubmit={createSeedlingHandler}
              onCancel={closeAddModal}
            >
              seedling
            </AddModal>
          </Fragment>
        )}
        <AddButton click={openAddModal}></AddButton>
      </div>
    </Fragment>
  );
};

export default SeedlingsPage;
