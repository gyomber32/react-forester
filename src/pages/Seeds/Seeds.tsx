import React, { useState, Fragment, useEffect } from "react";

import Navigation from "../../components/Navigation/Navigation";
import Table from "../../components/Table/Table";
import AddModal from "../../components/AddModal/AddModal";
import AddButton from "../../components/AddButton/AddButton";
import Popup from "../../components/Popup/Popup";
import Backdrop from "../../components/Backdrop/Backdrop";
import Spinner from "../../components/Spinner/Spinner";
import Chart from "../../components/Chart/Chart";
import NoData from "../../components/NoData/NoData";

import Seed from "../../models/types/Seed";
import PopUp from "../../models/types/PopUp";

import axios from "axios";

import styles from "./Seeds.module.scss";

const SeedsPage: React.FC = () => {

  const [seeds, setSeeds] = useState<Seed[]>([]);

  const [addModal, setAddModalState] = useState<boolean>(false);

  const [popup, setPopup] = useState<PopUp>({
    isOpen: false,
    message: "",
  });

  const [loading, setLoadingState] = useState<boolean>(false);

  const query = {
    query: `
    query {
      seeds {
          _id
          species
          seededQuantity
          brairdedQuantity
          dateSeeded
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
        setSeeds(result.data.data.seeds);
        setLoadingState(false);
      })
      .catch((error) => {
        console.log(error);
      });
      return () => {
        setPopup({isOpen: false, message: "message"});
      }
  }, []);

  const openAddModal = () => {
    setAddModalState(true);
  };

  const closeAddModal = () => {
    setAddModalState(false);
  };

  const onSubmit = (value: any) => {
    value.brairdedQuantity = value.seededQuantity;
    value.dateSeeded = value.dateSeeded.toDateString();
    const mutation = {
      query: `
        mutation {
          createSeed(seedInput: {species: "${value.species}", seededQuantity: ${value.seededQuantity}, brairdedQuantity: ${value.brairdedQuantity}, dateSeeded: "${value.dateSeeded}"}) {
            _id
            species
            seededQuantity
            brairdedQuantity
            dateSeeded
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
      <div className={styles.Seeds}>
        {loading && (
          <Fragment>
            <Backdrop></Backdrop>
            <Spinner></Spinner>
          </Fragment>
        )}
        {popup.isOpen && <Popup message={popup.message}></Popup>}
        <div className={styles.Seeds_seedsContainer}>
          {!loading && seeds.length > 0 && (
            <Fragment>
              <Table seeds={seeds}></Table>
              <Chart length={seeds.length} data={seeds}></Chart>
            </Fragment>
          )}
        </div>
        {!loading && seeds.length === 0 && <NoData>seeds</NoData>}
        {addModal && <Backdrop click={closeAddModal}></Backdrop>}
        {addModal && (
          <AddModal type="seeds" onSubmit={onSubmit} onCancel={closeAddModal}>
            seed
          </AddModal>
        )}
        <AddButton click={openAddModal}></AddButton>
      </div>
    </Fragment>
  );
};

export default SeedsPage;
