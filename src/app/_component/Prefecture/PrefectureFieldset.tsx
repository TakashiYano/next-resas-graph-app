import { type ChangeEvent, type FC } from "react";

import { CheckBox } from "@/component/CheckBox";
import { type Prefecture } from "@/lib/prefecture/type";

import { css } from "../../../../styled-system/css";

type PrefectureProps = {
  disabled: boolean;
  handleCheck: (prefCode: number, prefName: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  prefectures?: Prefecture[];
};

export const PrefectureFieldset: FC<PrefectureProps> = ({ disabled, handleCheck, prefectures }) => {
  return (
    <fieldset className={prefectureFieldset} disabled={disabled}>
      <legend className={prefectureLegend}>都道府県</legend>
      <div className={prefectureLayout}>
        {prefectures?.map((prefecture) => {
          return (
            <CheckBox
              key={prefecture.prefCode}
              label={prefecture.prefName}
              onChange={handleCheck(prefecture.prefCode, prefecture.prefName)}
            />
          );
        })}
      </div>
    </fieldset>
  );
};

const prefectureFieldset = css({
  border: "none",
});

const prefectureLegend = css({
  fontSize: "1.25rem",
  fontWeight: "bold",
  textAlign: "left",
});

const prefectureLayout = css({
  display: "grid",
  gap: "1rem",
  gridTemplateColumns: "repeat(auto-fit, 90px)",
  padding: "1rem",
  placeContent: "center",
});
