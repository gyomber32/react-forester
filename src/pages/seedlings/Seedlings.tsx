import React, { Component } from "react";
import Card from "../../components/Card/Card";
import DetailsModal from "../../components/DetailsModal/DetailsModal";
import AddModal from "../../components/AddModal/AddModal";
import Backdrop from "../../components/Backdrop/Backdrop";

/* Every child needs to learn how to cook, needs to learn how to cultivate a garden, plant seeds, learn about sustainability, be taken to a garden, and be able to put hands in the earth. */

import "./Seedlings.css";

import avatar0 from "../../assets/oak_seedling.jpg";
import avatar1 from "../../assets/red-oak_seedling.jpg";
import avatar2 from "../../assets/willow_seedling.jpg";
import avatar3 from "../../assets/aesculus_seedling.jpg";
import avatar4 from "../../assets/ulmus-minor_seedling.jpg";
import Button from "../../components/Button/Button";

export class SeedlingsPage extends Component<any, any> {
  state = {
    cards: [
      { imageSource: avatar0, species: "Oak", piece: 50, date: "2018-06-04" },
      {
        imageSource: avatar1,
        species: "Red oak",
        piece: 30,
        date: "2019-08-20"
      },
      {
        imageSource: avatar2,
        species: "Willow",
        piece: 50,
        date: "2020-03-07"
      },
      {
        imageSource: avatar3,
        species: "Aesculus",
        piece: 5,
        date: "2019-05-11"
      },
      {
        imageSource: avatar4,
        species: "Ulmus minor (Field elm)",
        piece: 5,
        date: "2019-10-12"
      }
    ],
    openDetailsModal: false,
    index: 0,
    openAddModal: false
  };

  openDetailsModal = (index: number) => {
    this.setState({ openDetailsModal: true, index: index });
  };

  closeDetailsModal = () => {
    this.setState({ openDetailsModal: false });
  };

  openAddModal = () => {
    this.setState({ openAddModal: true });
  }

  closeAddModal = () => {
    this.setState({ openAddModal: false });
  }

  render() {
    return (
      <div className="container">
        <div className="cards">
          {this.state.openDetailsModal && (
            <Backdrop click={this.closeDetailsModal}></Backdrop>
          )}
          {this.state.openDetailsModal && (
            <DetailsModal
              title={this.state.cards[this.state.index].species}
              img={this.state.cards[this.state.index].imageSource}
              piece={this.state.cards[this.state.index].piece}
              date={this.state.cards[this.state.index].date}
            ></DetailsModal>
          )}
          {this.state.cards.map((item: any, index: number) => (
            <Card
              imageSource={item.imageSource}
              species={item.species}
              piece={item.piece}
              click={() => this.openDetailsModal(index)}
            />
          ))}
        </div>
        {this.state.openAddModal && (<Backdrop click={this.closeAddModal}></Backdrop>)}
        {this.state.openAddModal && (<AddModal></AddModal>)}
        <Button click={this.openAddModal}></Button>
      </div>
    );
  }
}
