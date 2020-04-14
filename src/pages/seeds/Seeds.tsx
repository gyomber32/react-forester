import React, { Component, Fragment } from "react";

import Navigation from "../../components/Navigation/Navigation";
import Table from "../../components/Table/Table";
import AddModal from "../../components/AddModal/AddModal";
import AddButton from "../../components/AddButton/AddButton";
import Popup from "../../components/Popup/Popup";
import Backdrop from "../../components/Backdrop/Backdrop";
import Spinner from "../../components/Spinner/Spinner";
import Chart from "../../components/Chart/Chart";

import Seed from '../../models/types/Seed';

import styles from "./Seeds.module.scss";

type State = {
  seeds: Seed[];
  openAddModal: boolean;
  openPopup: boolean;
  loading: boolean;
};

export class SeedsPage extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      seeds: [],
      openAddModal: false,
      openPopup: false,
      loading: false,
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        seeds: [
          {
            id: "0",
            species: "Oak",
            piece: 50,
            dateSeeded: new Date("2018-06-04")
          },
          {
            id: "1",
            species: "Red oak",
            piece: 30,
            dateSeeded: new Date("2019-08-20"),
          },
          {
            id: "2",
            species: "Willow",
            piece: 50,
            dateSeeded: new Date("2020-03-07"),
          },
          {
            id: "3",
            species: "Aesculus",
            piece: 5,
            dateSeeded: new Date("2019-05-11"),
          },
          {
            id: "4",
            species: "Ulmus minor (Field elm)",
            piece: 5,
            dateSeeded: new Date("2019-10-12"),
          },
        ],
      });
      this.setState({ loading: false });
    }, 2000);
  }

  openAddModal = () => {
    this.setState({ openAddModal: true });
  };

  closeAddModal = () => {
    this.setState({ openAddModal: false });
  };

  onSubmit = (values: any) => {
    setTimeout(() => {
      const seeds = this.state.seeds;
      values.id = seeds[seeds.length - 1].id + 1;
      seeds.push(values);
      this.setState({ seeds: seeds });
      this.closeAddModal();
    }, 1000);
    setTimeout(() => {
      this.setState({ openPopup: true });
    }, 1000);
    setTimeout(() => {
      this.setState({ openPopup: false });
    }, 5000);
  };

  render() {
    return (
      <Fragment>
        <Navigation />
        <div className={styles.Seeds}>
          {this.state.loading && (
            <Fragment>
              <Backdrop></Backdrop>
              <Spinner></Spinner>
            </Fragment>
          )}
          {this.state.openPopup && (
            <Popup>Successfully added to database</Popup>
          )}
          <div className={styles.Seeds_seedsContainer}>
            {!this.state.loading && <Table seeds={this.state.seeds}></Table>}
            {!this.state.loading && <Chart data={this.state.seeds}></Chart>}
          </div>
          {this.state.openAddModal && (
            <Backdrop click={this.closeAddModal}></Backdrop>
          )}
          {this.state.openAddModal && (
            <AddModal
              type="seeds"
              onSubmit={this.onSubmit}
              onCancel={this.closeAddModal}
            >
              seed
            </AddModal>
          )}
          <AddButton click={this.openAddModal}></AddButton>
        </div>
      </Fragment>
    );
  }
}
