import { type FC } from "react";

import { CheckBox } from "@/component/CheckBox";
import { type Prefecture } from "@/lib/prefecture/type";

import { css } from "../../../../styled-system/css";

type Props = {
  prefectures: Prefecture[];
};

export const PrefectureFieldset: FC<Props> = ({ prefectures }) => {
  return (
    <fieldset className={prefectureFieldset}>
      <legend className={prefectureLegend}>都道府県</legend>
      <div className={prefectureLayout}>
        {prefectures.map((prefecture) => {
          return <CheckBox key={prefecture.prefCode} label={prefecture.prefName} />;
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
});
