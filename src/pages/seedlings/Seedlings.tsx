import React, { Component, Fragment } from "react";
import Card from "../../components/Card/Card";
import DetailsModal from "../../components/DetailsModal/DetailsModal";
import AddModal from "../../components/AddModal/AddModal";
import Backdrop from "../../components/Backdrop/Backdrop";
import AddButton from "../../components/AddButton/AddButton";
import Navigation from "../../components/Navigation/Navigation";
import Popup from "../../components/Popup/Popup";
import Spinner from "../../components/Spinner/Spinner";
import Chart from "../../components/Chart/Chart";

/* Every child needs to learn how to cook, needs to learn how to cultivate a garden, plant seeds, learn about sustainability, be taken to a garden, and be able to put hands in the earth. */

import styles from "./Seedlings.module.scss";

import avatar0 from "../../assets/oak_seedling.jpg";
import avatar1 from "../../assets/red-oak_seedling.jpg";
import avatar2 from "../../assets/willow_seedling.jpg";
import avatar3 from "../../assets/aesculus_seedling.jpg";
import avatar4 from "../../assets/ulmus-minor_seedling.jpg";

type Card = {
  id: string;
  species: string;
  piece: number;
  date_planted: Date;
  picture: string;
};

type State = {
  cards: Card[];
  selectedCard: Card;
  openDetailsModal: boolean;
  openAddModal: boolean;
  openPopup: boolean;
  loading: boolean;
};

export class SeedlingsPage extends Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      cards: [],
      selectedCard: {
        id: "",
        picture: "",
        species: "",
        piece: 0,
        date_planted: new Date(),
      },
      openDetailsModal: false,
      openAddModal: false,
      openPopup: false,
      loading: false,
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        cards: [
          {
            id: "0",
            picture: avatar0,
            species: "Oak",
            piece: 50,
            date_planted: new Date("2018-06-04"),
          },
          {
            id: "1",
            picture: avatar1,
            species: "Red oak",
            piece: 30,
            date_planted: new Date("2019-08-20"),
          },
          {
            id: "2",
            picture: avatar2,
            species: "Willow",
            piece: 50,
            date_planted: new Date("2020-03-07"),
          },
          {
            id: "3",
            picture: avatar3,
            species: "Aesculus",
            piece: 5,
            date_planted: new Date("2019-05-11"),
          },
          {
            id: "4",
            picture: avatar4,
            species: "Ulmus minor (Field elm)",
            piece: 5,
            date_planted: new Date("2019-10-12"),
          },
        ],
      });
      this.setState({ loading: false });
    }, 2000);
  }

  openDetailsModal = (id: string) => {
    const card = this.state.cards.filter((card) => card.id === id);
    this.setState({ openDetailsModal: true, selectedCard: card[0] });
  };

  closeDetailsModal = () => {
    this.setState({
      openDetailsModal: false,
      selectedCard: {
        id: "",
        picture: "",
        species: "",
        piece: 0,
        date_planted: new Date(),
      },
    });
  };

  openAddModal = () => {
    this.setState({ openAddModal: true });
  };

  closeAddModal = () => {
    this.setState({ openAddModal: false });
  };

  onSubmit = (value: any) => {
    setTimeout(() => {
      const cards = this.state.cards;
      value.id = cards[cards.length - 1].id + 1;
      cards.push(value);
      this.setState({ cards: cards });
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
        <div className={styles.Seedlings}>
          {this.state.loading && (
            <Fragment>
              <Backdrop></Backdrop>
              <Spinner></Spinner>
            </Fragment>
          )}
          {this.state.openPopup && (
            <Popup message={"Succesfully added to database"}></Popup>
          )}
          <div className={styles.Seedlings_cardsContainer}>
            {this.state.openDetailsModal && (
              <Backdrop click={this.closeDetailsModal}></Backdrop>
            )}
            {this.state.openDetailsModal && (
              <DetailsModal
                species={this.state.selectedCard.species}
                picture={this.state.selectedCard.picture}
                piece={this.state.selectedCard.piece}
                date_planted={this.state.selectedCard.date_planted}
              ></DetailsModal>
            )}
            {this.state.cards.map((item: Card) => (
              <Card
                key={item.id}
                picture={item.picture}
                species={item.species}
                piece={item.piece}
                click={() => this.openDetailsModal(item.id)}
              />
            ))}
          </div>
          {!this.state.loading && <Chart data={this.state.cards}></Chart>}
          {this.state.openAddModal && (
            <Backdrop click={this.closeAddModal}></Backdrop>
          )}
          {this.state.openAddModal && (
            <AddModal
              type="seedlings"
              onSubmit={this.onSubmit}
              onCancel={this.closeAddModal}
            >
              seedling
            </AddModal>
          )}
          <AddButton click={this.openAddModal}></AddButton>
        </div>
      </Fragment>
    );
  }
}
