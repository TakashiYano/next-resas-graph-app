"use client";

import { type FC } from "react";

import { PopulationGraph } from "@/app/_component/Population";
import { PrefectureFieldset } from "@/app/_component/Prefecture";
import { Alert } from "@/component/Alert";
import { Toast } from "@/component/Toast";
import { usePopulation } from "@/lib/population/usePopulation";
import { type Prefecture } from "@/lib/prefecture/type";

import { css } from "../../../../styled-system/css";

type MainProps = { prefectures: Prefecture[] };

export const Main: FC<MainProps> = ({ prefectures }) => {
  const { handlePrefectureCheck, handleResetError, isChecking, populationErrMsg, populations } =
    usePopulation();

  return (
    <>
      <div className={mainContainer}>
        <PrefectureFieldset
          prefectures={prefectures}
          handleCheck={handlePrefectureCheck}
          disabled={isChecking}
        />
        <PopulationGraph populations={populations} />
      </div>

      <Toast isOpen={!!populationErrMsg} onClose={handleResetError}>
        <Alert type="error">{populationErrMsg}</Alert>
      </Toast>
    </>
  );
};

const mainContainer = css({
  display: "grid",
  margin: "0 auto",
  maxWidth: "80rem",
  padding: "0 8%",
  rowGap: "2rem",
});
