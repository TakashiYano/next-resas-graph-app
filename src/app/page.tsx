import { type SeriesOptionsType } from "highcharts";

import { PopulationGraph } from "@/app/_component/Population";
import { PrefectureFieldset } from "@/app/_component/Prefecture";

const prefectures = [{ prefCode: 1, prefName: "北海道" }];

const populations: SeriesOptionsType[] = [
  {
    data: [
      [1960, 5039206],
      [1965, 5171800],
      [1970, 5184287],
      [1975, 5338206],
      [1980, 5575989],
      [1985, 5679439],
      [1990, 5643647],
      [1995, 5692321],
      [2000, 5683062],
      [2005, 5627737],
      [2010, 5506419],
      [2015, 5381733],
      [2020, 5216615],
      [2025, 5016554],
      [2030, 4791592],
      [2035, 4546357],
      [2040, 4280427],
      [2045, 4004973],
    ],
    name: "北海道",
    type: "line",
  },
];

export default function Home() {
  return (
    <div>
      <PrefectureFieldset prefectures={prefectures} />
      <PopulationGraph data={populations} />
    </div>
  );
}
