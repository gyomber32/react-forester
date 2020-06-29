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

import axios from "axios";

import styles from "./Trees.module.scss";

const TreesPage: React.FC = () => {
  const [trees, setTrees] = useState<Tree[]>([]);

  const [selectedTree, setSelectedTree] = useState<Tree>({
    _id: "",
    picture: "",
    species: "",
    plantedQuantity: 0,
    survivedQuantity: 0,
    datePlanted: "",
    location: "",
  });

  const [detailsModal, setDetailsModalState] = useState<boolean>(false);

  const [addModal, setAddModalState] = useState<boolean>(false);

  const [popup, setPopup] = useState<PopUp>({ isOpen: false, message: "" });

  const [loading, setLoadingState] = useState<boolean>(false);

  const query = {
    query: `
      query {
        trees {
          _id
          species
          plantedQuantity
          survivedQuantity
          datePlanted
          location
        }
      }`,
  };

  useEffect(() => {
    setLoadingState(true);
    axios({
      url: "http://localhost:3000/graphql",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      data: JSON.stringify(query),
    })
      .then((result) => {
        setLoadingState(false);
        setTrees(result.data.data.trees);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      //clearTimeout(a);
      //setPopup({isOpen: false, message: "message"});
    };
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

  const onSubmit = (value: any) => {
    value.survivedQuantity = value.plantedQuantity;
    value.datePlanted = value.datePlanted.toDateString();
    console.log(value);
    const mutation = {
      query: `
        mutation {
          createTree(treeInput: {species: "${value.species}", plantedQuantity: ${value.plantedQuantity}, survivedQuantity: ${value.survivedQuantity}, datePlanted: "${value.datePlanted}", location: "${value.location}", picture: "${value.picture}"}) {
            _id
            species
            plantedQuantity
            survivedQuantity
            datePlanted
            location
            picture
          }
        }`,
    };
    axios({
      url: "http://localhost:3000/graphql",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      data: JSON.stringify(mutation),
    })
      .then(() => {
        closeAddModal();
        setPopup({ isOpen: true, message: "Successfully added to database" });
        setTimeout(() => {
          setPopup({ isOpen: false, message: "" });
        }, 5500);
      })
      .catch((error) => {
        setPopup({ isOpen: true, message: "Error during adding to database" });
        setTimeout(() => {
          setPopup({ isOpen: false, message: "" });
        }, 5500);
        console.log(error);
      });
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
          ></DetailsModal>
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
