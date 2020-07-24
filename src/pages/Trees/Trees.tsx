import React, { Fragment, useState, useEffect } from "react";

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
import PopUp from "../../models/types/PopUp";

import {
  getAllTrees,
  getOneTree,
  removeTree,
  createTree,
} from "../../api/index";

import styles from "./Trees.module.scss";

const TreesPage: React.FC = (props) => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [selectedTree, setSelectedTree] = useState<Tree>({} as Tree);
  const [detailsModal, setDetailsModalState] = useState<boolean>(false);
  const [addModal, setAddModalState] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModalState] = useState<boolean>(
    false
  );
  const [popup, setPopup] = useState<PopUp>({ isOpen: false, message: "" });
  const [loading, setLoadingState] = useState<boolean>(false);

  const fetchOneTree = async (id: string) => {
    setLoadingState(true);
    try {
      const tree = await getOneTree(id);
      setTrees([...trees, tree]);
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

  const fetchAllTrees = async () => {
    setLoadingState(true);
    try {
      const trees = await getAllTrees();
      setTrees(trees);
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
    document.addEventListener("keydown", closeOnEscapeButton, false);
    fetchAllTrees();
    return () => {
      document.removeEventListener("keydown", closeOnEscapeButton, false);
    };
  }, []);

  const closeOnEscapeButton = (event?: any) => {
    if (event.keyCode === 27) {
      closeDetailsModal();
      closeAddModal();
      closeConfirmationModal();
    }
  };

  const openDetailsModal = (id: string) => {
    const tree = trees.filter((tree) => tree._id === id);
    setSelectedTree(tree[0]);
    setDetailsModalState(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalState(false);
    setSelectedTree({} as Tree);
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

  const deleteTree = async () => {
    setLoadingState(true);
    closeConfirmationModal();
    try {
      const responseMessage = await removeTree(selectedTree);
      await fetchAllTrees();
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
    closeAddModal();
    value.survivedQuantity = value.plantedQuantity;
    try {
      const id = await createTree(value);
      await fetchOneTree(id);
      setPopup({ isOpen: true, message: "Tree created successfully" });
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
      {console.log("Tree page rerender")}
      <div className={styles.Trees}>
        {loading && (
          <Fragment>
            <Backdrop zIndex={3}></Backdrop>
            <Spinner></Spinner>
          </Fragment>
        )}
        {popup.isOpen && <Popup message={popup.message}></Popup>}
        {!loading && trees.length > 0 && (
          <Fragment>
            <div className={styles.Trees_cardsContainer}>
              {trees.map((tree: Tree) => (
                <Card
                  key={tree._id}
                  item={tree}
                  click={() => openDetailsModal(tree._id)}
                />
              ))}
            </div>
            <Chart length={trees.length} data={trees}></Chart>
          </Fragment>
        )}
        {!loading && trees.length === 0 && <NoData>trees</NoData>}
        {detailsModal && (
          <Fragment>
            <Backdrop click={closeDetailsModal}></Backdrop>
            <DetailsModal
              species={selectedTree.species}
              picture={selectedTree.picture}
              plantedQuantity={selectedTree.plantedQuantity}
              survivedQuantity={selectedTree.survivedQuantity}
              datePlanted={selectedTree.datePlanted}
              daysInSoil={selectedTree.daysInSoil}
              openConfirmationModal={openConfirmationModal}
            ></DetailsModal>
          </Fragment>
        )}
        {confirmationModal && (
          <Fragment>
            <Backdrop click={closeConfirmationModal} zIndex={3}></Backdrop>
            <ConfirmationModal
              onYes={deleteTree}
              onCancel={closeConfirmationModal}
            ></ConfirmationModal>
          </Fragment>
        )}
        {addModal && (
          <Fragment>
            <Backdrop click={closeAddModal}></Backdrop>
            <AddModal type="trees" onSubmit={onSubmit} onCancel={closeAddModal}>
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
