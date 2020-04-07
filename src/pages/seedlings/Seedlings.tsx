import React, { Component, Fragment } from "react";
import Card from "../../components/Card/Card";
import DetailsModal from "../../components/DetailsModal/DetailsModal";
import AddModal from "../../components/AddModal/AddModal";
import Backdrop from "../../components/Backdrop/Backdrop";
import Button from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";

/* Every child needs to learn how to cook, needs to learn how to cultivate a garden, plant seeds, learn about sustainability, be taken to a garden, and be able to put hands in the earth. */

import "./Seedlings.css";

import avatar0 from "../../assets/oak_seedling.jpg";
import avatar1 from "../../assets/red-oak_seedling.jpg";
import avatar2 from "../../assets/willow_seedling.jpg";
import avatar3 from "../../assets/aesculus_seedling.jpg";
import avatar4 from "../../assets/ulmus-minor_seedling.jpg";

export class SeedlingsPage extends Component<any, any> {
  state = {
    cards: [
      {
        id: 0,
        imageSource: avatar0,
        species: "Oak",
        piece: 50,
        date: "2018-06-04",
      },
      {
        id: 1,
        imageSource: avatar1,
        species: "Red oak",
        piece: 30,
        date: "2019-08-20",
      },
      {
        id: 2,
        imageSource: avatar2,
        species: "Willow",
        piece: 50,
        date: "2020-03-07",
      },
      {
        id: 3,
        imageSource: avatar3,
        species: "Aesculus",
        piece: 5,
        date: "2019-05-11",
      },
      {
        id: 4,
        imageSource: avatar4,
        species: "Ulmus minor (Field elm)",
        piece: 5,
        date: "2019-10-12",
      },
    ],
    selectedCard: {
      id: null,
      imageSource: "",
      species: "",
      piece: null,
      date: "",
    },
    openDetailsModal: false,
    openAddModal: false,
  };

  openDetailsModal = (id: number) => {
    const card = this.state.cards.find((card) => card.id === id);
    this.setState({ openDetailsModal: true, selectedCard: card });
    setTimeout(() => {
      console.log(this.state.selectedCard);
    }, 3000);
  };

  closeDetailsModal = () => {
    this.setState({ openDetailsModal: false });
    this.setState({
      selectedCard: {
        id: null,
        imageSource: "",
        species: "",
        piece: null,
        date: "",
      },
    });
    setTimeout(() => {
      console.log(this.state.selectedCard);
    }, 3000);
  };

  openAddModal = () => {
    this.setState({ openAddModal: true });
  };

  closeAddModal = () => {
    this.setState({ openAddModal: false });
  };

  render() {
    return (
      <Fragment>
        <Navigation />
        <div className="container">
          <div className="cards">
            {this.state.openDetailsModal && (
              <Backdrop click={this.closeDetailsModal}></Backdrop>
            )}
            {this.state.openDetailsModal && (
              <DetailsModal
                title={this.state.selectedCard.species}
                img={this.state.selectedCard.imageSource}
                piece={this.state.selectedCard.piece}
                date={this.state.selectedCard.date}
              ></DetailsModal>
            )}
            {this.state.cards.map((item: any) => (
              <Card
                key={item.id}
                imageSource={item.imageSource}
                species={item.species}
                piece={item.piece}
                click={() => this.openDetailsModal(item.id)}
              />
            ))}
          </div>
          {this.state.openAddModal && (
            <Backdrop click={this.closeAddModal}></Backdrop>
          )}
          {this.state.openAddModal && <AddModal></AddModal>}
          <Button click={this.openAddModal}></Button>
        </div>
      </Fragment>
    );
  }
}
