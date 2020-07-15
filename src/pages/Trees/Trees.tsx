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

import Tree from "../../models/types/Tree";
import PopUp from "../../models/types/PopUp";

import NoPicture from "../../assets/no-content.png";

import axios from "axios";

import styles from "./Trees.module.scss";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

const TreesPage: React.FC = (props) => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [selectedTree, setSelectedTree] = useState<Tree>({
    _id: "",
    picture: "",
    pictureId: "",
    species: "",
    plantedQuantity: 0,
    survivedQuantity: 0,
    datePlanted: "",
    location: "",
  });
  const [detailsModal, setDetailsModalState] = useState<boolean>(false);
  const [addModal, setAddModalState] = useState<boolean>(false);
  const [confirmationModal, setConfirmationModalState] = useState<boolean>(
    false
  );
  const [popup, setPopup] = useState<PopUp>({ isOpen: false, message: "" });
  const [loading, setLoadingState] = useState<boolean>(false);

  const allTreesQuery = {
    query: `
      query {
        trees {
          _id
          species
          plantedQuantity
          survivedQuantity
          datePlanted
          pictureId
          location
        }
      }`,
  };

  const getOneTree = async (id: string) => {
    setLoadingState(true);
    try {
      const response = await axios({
        url: "http://localhost:3000/graphql",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        data: JSON.stringify({
          query: `
          query {
            oneTree(_id: "${id}"){
              _id
              species
              plantedQuantity
              survivedQuantity
              datePlanted
              pictureId
              location
            }
          }`,
        }),
      });
      if (!response) {
        throw new Error("No response from the server");
      }
      const tree: Tree = {
        _id: response.data.data.oneTree._id,
        species: response.data.data.oneTree.species,
        plantedQuantity: response.data.data.oneTree.plantedQuantity,
        survivedQuantity: response.data.data.oneTree.survivedQuantity,
        datePlanted: response.data.data.oneTree.datePlanted,
        picture: response.data.data.oneTree.pictureId
          ? `http://localhost:3000/picture/${response.data.data.oneTree.pictureId}`
          : NoPicture,
        pictureId: response.data.data.oneTree.pictureId,
        location: response.data.data.oneTree.location,
      };
      let tempTrees = trees;
      tempTrees.push(tree);
      setTrees(tempTrees);
    } catch (error) {
      setPopup({
        isOpen: true,
        message: "Error during fecthing from database",
      });
      setTimeout(() => {
        setPopup({ isOpen: false, message: "" });
      }, 5500);
      console.log(error);
    }
    setLoadingState(false);
  };

  const getAllTrees = async () => {
    setLoadingState(true);
    try {
      const response = await axios({
        url: "http://localhost:3000/graphql",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        data: JSON.stringify(allTreesQuery),
      });
      if (!response) {
        throw new Error("No response from the server");
      }
      let trees: Tree[] = [];
      response.data.data.trees.forEach((tree: Tree) => {
        const tempTree: Tree = {
          _id: tree._id,
          species: tree.species,
          plantedQuantity: tree.plantedQuantity,
          survivedQuantity: tree.survivedQuantity,
          datePlanted: tree.datePlanted,
          picture: tree.pictureId
            ? `http://localhost:3000/picture/${tree.pictureId}`
            : NoPicture,
          pictureId: tree.pictureId,
          location: tree.location,
        };
        trees.push(tempTree);
      });
      setTrees(trees);
    } catch (error) {
      setPopup({
        isOpen: true,
        message: "Error during fecthing from database",
      });
      setTimeout(() => {
        setPopup({ isOpen: false, message: "" });
      }, 5500);
      console.log(error);
    }
    setLoadingState(false);
  };

  useEffect(() => {
    getAllTrees();
  }, []);

  const openDetailsModal = (id: string) => {
    const tree = trees.filter((tree) => tree._id === id);
    setSelectedTree(tree[0]);
    setDetailsModalState(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalState(false);
    setSelectedTree({
      _id: "",
      picture: "",
      pictureId: "",
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
    try {
      if (selectedTree.pictureId) {
        const pictureResponse = await axios({
          method: "delete",
          url: `http://localhost:3000/picture/${selectedTree.pictureId}`,
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!pictureResponse) {
          throw new Error("No response from the server");
        }
      }
      const mutation = {
        query: `
            mutation {
              deleteTree(_id: "${selectedTree._id}"){
                message
              }
            }`,
      };
      const response = await axios({
        url: "http://localhost:3000/graphql",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
        method: "POST",
        data: JSON.stringify(mutation),
      });
      if (!response.data.data.deleteTree) {
        throw new Error("No response from the server");
      }
      await getAllTrees();
      closeConfirmationModal();
      setPopup({
        isOpen: true,
        message: response.data.data.deleteTree.message,
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
    if (value.picture) {
      let bodyFormData = new FormData();
      bodyFormData.append("picture", value.picture);
      try {
        const pictureResponse = await axios({
          method: "post",
          url: "http://localhost:3000/picture",
          data: bodyFormData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (!pictureResponse.data.id) {
          throw new Error("No response from the server");
        }
        const mutation = {
          query: `
            mutation {
              createTree(treeInput: {species: "${
                value.species
              }", plantedQuantity: ${
            value.plantedQuantity
          }, survivedQuantity: ${
            value.survivedQuantity
          }, datePlanted: "${value.datePlanted.toDateString()}", location: "${
            value.location
          }", pictureId: "${pictureResponse.data.id}"}) {
                _id
                species
                plantedQuantity
                survivedQuantity
                datePlanted
                location
                pictureId
              }
            }`,
        };
        const treeResponse = await axios({
          url: "http://localhost:3000/graphql",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
          method: "POST",
          data: JSON.stringify(mutation),
        });
        if (!treeResponse.data.data.createTree._id) {
          throw new Error("No response from the server");
        }
        closeAddModal();
        setPopup({ isOpen: true, message: "Successfully added to database" });
        setTimeout(() => {
          setPopup({ isOpen: false, message: "" });
        }, 5500);
        await getOneTree(treeResponse.data.data.createTree._id);
      } catch (error) {
        setPopup({ isOpen: true, message: "Error during adding to database" });
        setTimeout(() => {
          setPopup({ isOpen: false, message: "" });
        }, 5500);
        console.log(error);
      }
      setLoadingState(false);
    } else {
      try {
        const mutation = {
          query: `
            mutation {
              createTree(treeInput: {species: "${value.species}", plantedQuantity: ${value.plantedQuantity}, survivedQuantity: ${value.survivedQuantity}, datePlanted: "${value.datePlanted}", location: "${value.location}", pictureId: ""}) {
                _id
                species
                plantedQuantity
                survivedQuantity
                datePlanted
                location
                pictureId
              }
            }`,
        };
        const treeResponse = await axios({
          url: "http://localhost:3000/graphql",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
          method: "POST",
          data: JSON.stringify(mutation),
        });
        if (!treeResponse.data.data.createTree._id) {
          throw new Error("No response from the server");
        }
        closeAddModal();
        setPopup({ isOpen: true, message: "Successfully added to database" });
        setTimeout(() => {
          setPopup({ isOpen: false, message: "" });
        }, 5500);
        await getOneTree(treeResponse.data.data.createTree._id);
      } catch (error) {
        setPopup({ isOpen: true, message: "Error during adding to database" });
        setTimeout(() => {
          setPopup({ isOpen: false, message: "" });
        }, 5500);
        console.log(error);
      }
    }
    setLoadingState(false);
  };

  return (
    <Fragment>
      <Navigation />
      <div className={styles.Trees}>
        {loading && (
          <Fragment>
            <Backdrop></Backdrop>
            <Spinner></Spinner>
          </Fragment>
        )}
        {popup.isOpen && <Popup message={popup.message}></Popup>}
        {!loading && trees.length > 0 && (
          <Fragment>
            <div className={styles.Trees_cardsContainer}>
              {trees.map((item: Tree) => (
                <Card
                  key={item._id}
                  species={item.species}
                  picture={item.picture}
                  plantedQuantity={item.plantedQuantity}
                  survivedQuantity={item.survivedQuantity}
                  click={() => openDetailsModal(item._id)}
                />
              ))}
            </div>
            <Chart length={trees.length} data={trees}></Chart>
          </Fragment>
        )}
        {!loading && trees.length === 0 && <NoData>trees</NoData>}
        {detailsModal && <Backdrop click={closeDetailsModal}></Backdrop>}
        {detailsModal && (
          <DetailsModal
            species={selectedTree.species}
            picture={selectedTree.picture}
            plantedQuantity={selectedTree.plantedQuantity}
            survivedQuantity={selectedTree.survivedQuantity}
            datePlanted={selectedTree.datePlanted}
            openConfirmationModal={openConfirmationModal}
          ></DetailsModal>
        )}
        {confirmationModal && (
          <Fragment>
            <Backdrop click={closeConfirmationModal}></Backdrop>
            <ConfirmationModal
              onYes={deleteTree}
              onCancel={closeConfirmationModal}
            ></ConfirmationModal>
          </Fragment>
        )}
        {addModal && <Backdrop click={closeAddModal}></Backdrop>}
        {addModal && (
          <AddModal type="trees" onSubmit={onSubmit} onCancel={closeAddModal}>
            tree
          </AddModal>
        )}
        <AddButton click={openAddModal}></AddButton>
      </div>
    </Fragment>
  );
};

export default TreesPage;
