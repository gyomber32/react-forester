import React from "react";

import { Doughnut } from "react-chartjs-2";

import Seedling from "../../models/types/Seedling";
import Seed from "../../models/types/Seed";

import chartPropsTransform from "../../utils/ChartPropTransform";

import styles from "./Chart.module.scss";

type Props = {
  data: Seedling[] | Seed[];
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
