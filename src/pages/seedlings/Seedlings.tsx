import React, { Component } from "react";
import Card from "../../components/Card/Card";
import DetailsModal from "../../components/Details/Details";
import Backdrop from "../../components/Backdrop/Backdrop";

/* Every child needs to learn how to cook, needs to learn how to cultivate a garden, plant seeds, learn about sustainability, be taken to a garden, and be able to put hands in the earth. */

import "./Seedlings.css";

import avatar0 from "../../assets/oak_seedling.jpg";
import avatar1 from "../../assets/red-oak_seedling.jpg";
import avatar2 from "../../assets/willow_seedling.jpg";

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
      { imageSource: avatar2, species: "Willow", piece: 50, date: "2020-03-07" }
    ],
    openModal: false,
    index: 0
  };

  openDetailsModal = (index: number) => {
    this.setState({ openModal: true, index: index });
  };

  closeDetailsModal = () => {
    this.setState({ openModal: false });
  };

  render() {
    return (
      <div className="container">
        <div className="cards">
          {this.state.openModal && (
            <Backdrop click={this.closeDetailsModal}></Backdrop>
          )}
          {this.state.openModal && (
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
      </div>
    );
  }
}
