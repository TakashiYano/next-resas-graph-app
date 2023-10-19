import { type ChangeEvent, type FC } from "react";

import { CheckBox } from "@/component/CheckBox";
import { type Prefecture } from "@/lib/prefecture/type";

import { css } from "../../../../styled-system/css";

type Props = {
  handleCheck: (prefCode: number, prefName: string) => (e: ChangeEvent<HTMLInputElement>) => void;
  prefectures?: Prefecture[];
};

export const PrefectureFieldset: FC<Props> = ({ handleCheck, prefectures }) => {
  return (
    <fieldset className={prefectureFieldset}>
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
  fontSize: "32px",
});

const prefectureLayout = css({
  display: "grid",
  gap: "8px",
  gridTemplateColumns: "repeat(auto-fit, minmax(80px, 136px))",
  padding: "1rem",
});
