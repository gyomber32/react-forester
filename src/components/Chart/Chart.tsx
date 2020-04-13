import React from "react";

import { Doughnut } from "react-chartjs-2";

import chartPropsTransform from "../../utils/ChartPropTransform";

import styles from "./Chart.module.scss";

type Card = {
  id: string;
  species: string;
  piece: number;
  date_planted: Date;
  picture: string;
};

type Seeds = {
  id: number;
  species: string;
  piece: number;
  date: Date;
};

type Props = {
  data: Card[] | Seeds[];
};

const Chart: React.FC<Props> = (props) => {
  return (
    <div className={styles.Chart}>
      <Doughnut
        data={chartPropsTransform(props.data)}
        options={{
          legend: {
            labels: {
              fontSize: 18,
              fontStyle: "bold",
              fontColor: "white",
            },
          },
        }}
        width={100}
        height={50}
      />
    </div>
  );
};

export default Chart;
