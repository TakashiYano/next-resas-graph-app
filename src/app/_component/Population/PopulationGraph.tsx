"use client";

import { type FC } from "react";

import Highcharts, { type Options, type SeriesOptionsType } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import Accessibility from "highcharts/modules/accessibility";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";

type PopulationProps = {
  populations: SeriesOptionsType[];
};

export const PopulationGraph: FC<PopulationProps> = ({ populations }) => {
  if (typeof Highcharts === "object") {
    HighchartsMore(Highcharts);
    NoDataToDisplay(Highcharts);
    Accessibility(Highcharts);
  }
  const options: Options = {
    lang: {
      noData: "表示するデータがありません",
    },
    legend: {
      align: "right",
      layout: "vertical",
      verticalAlign: "middle",
    },
    noData: {
      style: {
        fontSize: "1rem",
        fontWeight: "bold",
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
    series: populations,
    subtitle: {
      text: "選択した都道府県のデータを表示",
    },
    title: {
      text: "総人口推移グラフ",
    },
    xAxis: {
      title: {
        align: "high",
        text: "年度",
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
