"use client";

import { type FC } from "react";

import Highcharts, { type Options, type SeriesOptionsType } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";

type Props = {
  data: SeriesOptionsType[];
};

export const PopulationGraph: FC<Props> = ({ data }) => {
  if (typeof Highcharts === "object") {
    HighchartsMore(Highcharts);
  }
  const options: Options = {
    legend: {
      align: "right",
      layout: "vertical",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    responsive: {
      rules: [
        {
          chartOptions: {
            legend: {
              align: "center",
              layout: "horizontal",
              verticalAlign: "bottom",
            },
          },
          condition: {
            maxWidth: 600,
          },
        },
      ],
    },

    series: data,
    subtitle: {
      text: "選択した都道府県のデータが表示されます。",
    },
    title: {
      text: "人口遷移グラフ",
    },

    xAxis: {
      title: {
        align: "high",
        text: "年度",
        x: 30,
        y: -20,
      },
    },

    yAxis: {
      title: {
        align: "high",
        offset: 0,
        rotation: 0,
        text: "人口数",
        y: -20,
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
