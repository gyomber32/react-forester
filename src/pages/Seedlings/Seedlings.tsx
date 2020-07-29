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

//import { useFetchSeedling } from "../../hooks";

import styles from "./Seedlings.module.scss";

const SeedlingsPage: React.FC = () => {
  const [selectedSeedling, setSelectedSeedling] = useState<Seedling>(
    {} as Seedling
  );
  const [detailsModal, setDetailsModal] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  //const { seedlings, isLoading, popup, fetchSeedling } = useFetchSeedling();

  const openDetailsModal = useCallback(
    (id: string) => {
      //const seedling = seedlings.filter((seedling) => seedling._id === id)[0];
      //setSelectedSeedling(seedling);
      setDetailsModal(true);
    },
    [setDetailsModal]
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

  const openConfirmationModal = useCallback(() => {
    setConfirmationModal(true);
  }, [setConfirmationModal]);

  const closeConfirmationModal = useCallback(() => {
    setConfirmationModal(false);
    if (detailsModal) {
      closeDetailsModal();
    }
  }, [closeDetailsModal, detailsModal]);

  const deleteSeedling = useCallback(async () => {
    //fetchSeedling("DELETE", selectedSeedling);
    closeConfirmationModal();
    closeDetailsModal();
  }, [closeConfirmationModal, closeDetailsModal]);

  const createSeedling = useCallback(
    async (seedling: Seedling) => {
      //fetchSeedling("CREATE", seedling);
      closeAddModal();
    },
    [closeAddModal]
  );

  const closeOnEscapeButton = useCallback(
    (event?: any) => {
      if (event.keyCode === 27) {
        if (detailsModal) closeDetailsModal();
        if (addModal) closeAddModal();
        if (confirmationModal) closeConfirmationModal();
      }
    },
    [
      addModal,
      confirmationModal,
      detailsModal,
      closeAddModal,
      closeConfirmationModal,
      closeDetailsModal,
    ]
  );

  useEffect(() => {
    document.addEventListener("keydown", closeOnEscapeButton, false);
  }, [closeOnEscapeButton]);

  return (
    <Fragment>
      <Navigation />
      <div className={styles.Seedlings}>
        {/* {isLoading && (
          <Fragment>
            <Backdrop></Backdrop>
            <Spinner></Spinner>
          </Fragment>
        )}
        {popup.isOpen && <Popup message={popup.message}></Popup>}
        {!isLoading && seedlings.length > 0 && (
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
            <Chart data={seedlings}></Chart>
          </Fragment>
        )}
        {!isLoading && seedlings.length === 0 && <NoData>seedlings</NoData>} */}
        {detailsModal && (
          <Fragment>
            <Backdrop click={closeDetailsModal}></Backdrop>
            <DetailsModal
              item={selectedSeedling}
              openConfirmationModal={openConfirmationModal}
            ></DetailsModal>
          </Fragment>
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
        {addModal && (
          <Fragment>
            <Backdrop click={closeAddModal}></Backdrop>
            <AddModal
              type="seedlings"
              onSubmit={createSeedling}
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
