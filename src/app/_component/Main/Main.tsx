import { type FC } from "react";

import { PopulationGraph } from "@/app/_component/Population";
import { PrefectureFieldset } from "@/app/_component/Prefecture";
import { type Prefecture } from "@/lib/prefecture/type";

import { css } from "../../../../styled-system/css";

type MainProps = { prefectures: Prefecture[] };

export const Main: FC<MainProps> = ({ prefectures }) => {
  return (
    <main className={main}>
      <div className={container}>
        <PrefectureFieldset prefectures={prefectures} />
        <PopulationGraph data={data} />
      </div>
    </main>
  );
};

const main = css({
  margin: "24px 0",
});

const container = css({
  display: "grid",
  margin: "0 auto",
  maxWidth: "1280px",
  padding: "0 8%",
  rowGap: "32px",
});

const data: Highcharts.SeriesOptionsType[] = [
  {
    data: [
      5039206, 5171800, 5184287, 5338206, 5575989, 5679439, 5643647, 5692321, 5683062, 5627737,
      5506419, 5381733, 5216615, 5016554, 4791592, 4546357, 4280427, 4004973,
    ],
    name: "北海道",
    type: "line",
  },
  {
    data: [
      1426606, 1416591, 1427520, 1468646, 1523907, 1524448, 1482873, 1481663, 1475728, 1436657,
      1373339, 1308265, 1235971, 1157332, 1076393, 993737, 908974, 823610,
    ],
    name: "青森県",
    type: "line",
  },
];
