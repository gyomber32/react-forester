import React, { Component, Fragment } from "react";

import Navigation from "../../components/Navigation/Navigation";
import Table from "../../components/Table/Table";

import "./Seeds.css";

export class SeedsPage extends Component {
  state = {
    seeds: [
      {
        id: 0,
        species: "Oak",
        piece: 50,
        date: "2018-06-04",
      },
      {
        id: 1,
        species: "Red oak",
        piece: 30,
        date: "2019-08-20",
      },
      {
        id: 2,
        species: "Willow",
        piece: 50,
        date: "2020-03-07",
      },
      {
        id: 3,
        species: "Aesculus",
        piece: 5,
        date: "2019-05-11",
      },
      {
        id: 4,
        species: "Ulmus minor (Field elm)",
        piece: 5,
        date: "2019-10-12",
      },
    ],
  };

  render() {
    return (
      <Fragment>
        <Navigation />
        <div className="seeds_container">
          <Table seeds={this.state.seeds}></Table>
        </div>
      </Fragment>
    );
  }
}
