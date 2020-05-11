import React, { useState, Fragment, useEffect } from "react";

import Navigation from "../../components/Navigation/Navigation";
import Table from "../../components/Table/Table";
import AddModal from "../../components/AddModal/AddModal";
import AddButton from "../../components/AddButton/AddButton";
import Popup from "../../components/Popup/Popup";
import Backdrop from "../../components/Backdrop/Backdrop";
import Spinner from "../../components/Spinner/Spinner";
import Chart from "../../components/Chart/Chart";

import Seed from "../../models/types/Seed";

import axios from "axios";

import styles from "./Seeds.module.scss";

const SeedsPage: React.FC = () => {
  const [seeds, setSeeds] = useState<Seed[]>([]);

  const [addModal, setAddModalState] = useState<boolean>(false);

  const [popup, setPopupState] = useState<boolean>(false);

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
        "Authorization": `bearer ${sessionStorage.getItem("token")}`,
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
  }, []);

  const openAddModal = () => {
    setAddModalState(true);
  };

  const closeAddModal = () => {
    setAddModalState(false);
  };

  const onSubmit = (value: any) => {
    setTimeout(() => {
      // needs to be deleted after values will be fecthed from the backend
      value._id = seeds[seeds.length - 1]._id + 1;
      value.dateSeeded = value.dateSeeded.toDateString();
      const newSeeds = seeds;
      newSeeds.push(value);
      setSeeds(newSeeds);
      closeAddModal();
    }, 1000);
    setTimeout(() => {
      setPopupState(true);
    }, 1000);
    setTimeout(() => {
      setPopupState(false);
    }, 5000);
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
        {popup && <Popup>Successfully added to database</Popup>}
        <div className={styles.Seeds_seedsContainer}>
          {!loading && <Table seeds={seeds}></Table>}
          {!loading && <Chart length={seeds.length} data={seeds}></Chart>}
        </div>
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
