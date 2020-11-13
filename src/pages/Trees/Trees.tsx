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
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const fetchTrees = useFetchAllTrees();
  const createTree = useCreateTree();
  const deleteTree = useDeleteTree();
  const trees = useTrees();
  const isLoading = useLoader();
  const popup = usePopup();

  const openDetailsModal = useCallback(
    (tree: Tree) => {
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

  const openDeleteModal = useCallback(() => {
    setDeleteModal(true);
  }, [setDeleteModal]);

  const closeDeleteModal = useCallback(() => {
    setDeleteModal(false);
    if (detailsModal) {
      closeDetailsModal();
    }
  }, [closeDetailsModal, detailsModal]);

  const deleteTreeHandler = useCallback(async () => {
    deleteTree(selectedTree);
    closeDeleteModal();
    closeDetailsModal();
  }, [closeDeleteModal, closeDetailsModal, selectedTree]);

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
              {trees.map((tree: Tree) => (
                <Card
                  key={tree._id}
                  species={tree.species}
                  picture={tree.picture}
                  survivedQuantity={tree.survivedQuantity}
                  click={() => openDetailsModal(tree)}
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
              type='tree'
              item={selectedTree}
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
              itemType="tree"
              onYes={deleteTreeHandler}
              onCancel={closeDeleteModal}
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
