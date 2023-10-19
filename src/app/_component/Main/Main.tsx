"use client";

import { type FC } from "react";

import { PopulationGraph } from "@/app/_component/Population";
import { PrefectureFieldset } from "@/app/_component/Prefecture";
import { usePopulation } from "@/lib/population/usePopulation";
import { type Prefecture } from "@/lib/prefecture/type";

import { css } from "../../../../styled-system/css";

type MainProps = { prefectures: Prefecture[] };

export const Main: FC<MainProps> = ({ prefectures }) => {
  const { handlePrefectureCheck, populations } = usePopulation();

  return (
    <main className={main}>
      <div className={container}>
        <PrefectureFieldset prefectures={prefectures} handleCheck={handlePrefectureCheck} />
        <PopulationGraph data={populations} />
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
