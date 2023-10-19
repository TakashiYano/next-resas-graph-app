"use client";

import { type FC } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsExporting from "highcharts/modules/exporting";

type Props = {
  data: Highcharts.SeriesOptionsType[];
};

export const PopulationGraph: FC<Props> = ({ data }) => {
  if (typeof Highcharts === "object") {
    HighchartsExporting(Highcharts);
    HighchartsMore(Highcharts);
  }
  const options: Highcharts.Options = {
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
        pointInterval: 5,
        pointStart: 1960,
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
    title: {
      text: "人口遷移グラフ",
    },

    xAxis: {
      accessibility: {
        rangeDescription: "Range: 1980 to 2020",
      },
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
