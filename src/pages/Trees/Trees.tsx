/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect, useCallback } from "react";

import Card from "../../components/Card/Card";
import DetailsModal from "../../components/DetailsModal/DetailsModal";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import AddModal from "../../components/AddModal/AddModal";
import Backdrop from "../../components/Backdrop/Backdrop";
import AddButton from "../../components/AddButton/AddButton";
import Navigation from "../../components/Navigation/Navigation";
import Popup from "../../components/Popup/Popup";
import Spinner from "../../components/Spinner/Spinner";
import Chart from "../../components/Chart/Chart";
import NoData from "../../components/NoData/NoData";

import Tree from "../../models/types/Tree";

import {
  useFetchAllTrees,
  useCreateTree,
  useDeleteTree,
} from "../../hooks/tree";

import styles from "./Trees.module.scss";

import { useTrees, useLoader, usePopup } from "../../hooks";

const TreesPage: React.FC = () => {
  const [selectedTree, setSelectedTree] = useState<Tree>({} as Tree);
  const [detailsModal, setDetailsModal] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  const fetchTrees = useFetchAllTrees();
  const createTree = useCreateTree();
  const deleteTree = useDeleteTree();
  const trees = useTrees();
  const isLoading = useLoader();
  const popup = usePopup();

  const openDetailsModal = useCallback(
    (id: string) => {
      const tree = trees.filter((tree) => tree._id === id)[0];
      setSelectedTree(tree);
      setDetailsModal(true);
    },
    [setSelectedTree, setDetailsModal, trees]
  );

  const closeDetailsModal = useCallback(() => {
    setDetailsModal(false);
    setSelectedTree({} as Tree);
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

  const deleteTreeHandler = useCallback(async () => {
    deleteTree(selectedTree);
    closeConfirmationModal();
    closeDetailsModal();
  }, [closeConfirmationModal, closeDetailsModal, selectedTree]);

  const createTreeHandler = useCallback(
    (tree: Tree) => {
      createTree(tree);
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
    fetchTrees();
  }, [fetchTrees]);

  useEffect(() => {
    document.addEventListener("keydown", closeOnEscapeButton, false);
  }, [closeOnEscapeButton]);

  return (
    <Fragment>
      <Navigation />
      <div className={styles.Trees}>
        {isLoading && (
          <Fragment>
            <Backdrop zIndex={3}></Backdrop>
            <Spinner></Spinner>
          </Fragment>
        )}
        {popup.isOpen && <Popup message={popup.message}></Popup>}
        {!isLoading && trees.length > 0 && (
          <Fragment>
            <div className={styles.Trees_cardsContainer}>
              {trees.map((item: Tree) => (
                <Card
                  key={item._id}
                  species={item.species}
                  picture={item.picture}
                  survivedQuantity={item.survivedQuantity}
                  click={() => openDetailsModal(item._id)}
                />
              ))}
            </div>
            <Chart data={trees}></Chart>
          </Fragment>
        )}
        {!isLoading && trees.length === 0 && <NoData>trees</NoData>}
        {detailsModal && (
          <Fragment>
            <Backdrop click={closeDetailsModal}></Backdrop>
            <DetailsModal
              item={selectedTree}
              openConfirmationModal={openConfirmationModal}
            ></DetailsModal>
          </Fragment>
        )}
        {confirmationModal && (
          <Fragment>
            <Backdrop click={closeConfirmationModal} zIndex={3}></Backdrop>
            <ConfirmationModal
              onYes={deleteTreeHandler}
              onCancel={closeConfirmationModal}
            ></ConfirmationModal>
          </Fragment>
        )}
        {addModal && (
          <Fragment>
            <Backdrop click={closeAddModal}></Backdrop>
            <AddModal
              type="trees"
              onSubmit={createTreeHandler}
              onCancel={closeAddModal}
            >
              tree
            </AddModal>
          </Fragment>
        )}
        <AddButton click={openAddModal}></AddButton>
      </div>
    </Fragment>
  );
};

export default TreesPage;
