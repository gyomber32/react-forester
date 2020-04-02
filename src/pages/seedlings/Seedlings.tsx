import React, { Component } from "react";
import Card from "../../components/Card/Card";

import "./Seedlings.css";

import avatar0 from '../../assets/oak_seedling.jpg';
import avatar1 from '../../assets/red-oak_seedling.jpg';
import avatar2 from '../../assets/willow_seedling.jpg';

export class SeedlingsPage extends Component {

  generateImg() {
    const random = Math.floor(Math.random() * 3);
    switch (random) {
      case 0:
        return avatar0;
      case 1:
        return avatar1;
      case 2:
        return avatar2;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="cards">
          <Card imageSource={this.generateImg()} species={'Willow'} piece={50} />
          <Card imageSource={this.generateImg()} species={'Willow'} piece={50}/>
          <Card imageSource={this.generateImg()} species={'Willow'} piece={50}/>
          <Card imageSource={this.generateImg()} species={'Willow'} piece={50}/>
          <Card imageSource={this.generateImg()} species={'Willow'} piece={50}/>
        </div>
        <div>Statistics</div>
      </div>
    );
  }
}
