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

import styles from "./Seeds.module.scss";

const SeedsPage: React.FC = () => {
  const [seeds, setSeeds] = useState<Seed[]>([]);

  const [addModal, setAddModalState] = useState<boolean>(false);

  const [popup, setPopupState] = useState<boolean>(false);

  const [loading, setLoadingState] = useState<boolean>(false);

  useEffect(() => {
    setLoadingState(true);
    setTimeout(() => {
      setSeeds([
        {
          id: "0",
          species: "Oak",
          piece: 50,
          dateSeeded: new Date("2018-06-04").toDateString(),
        },
        {
          id: "1",
          species: "Red oak",
          piece: 30,
          dateSeeded: new Date("2019-08-20").toDateString(),
        },
        {
          id: "2",
          species: "Willow",
          piece: 50,
          dateSeeded: new Date("2020-03-07").toDateString(),
        },
        {
          id: "3",
          species: "Aesculus",
          piece: 5,
          dateSeeded: new Date("2019-05-11").toDateString(),
        },
        {
          id: "4",
          species: "Ulmus minor (Field elm)",
          piece: 5,
          dateSeeded: new Date("2019-10-12").toDateString(),
        },
      ]);

      setLoadingState(false);
    }, 2000);
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
      value.id = seeds[seeds.length - 1].id + 1;
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
