import { type FC } from "react";

import { css } from "../../../styled-system/css";

type Props = {
  label: string;
};

export const CheckBox: FC<Props> = ({ label }) => {
  return (
    <label className={checkBoxControl}>
      <input className={checkBox} type="checkbox" />
      <span className={labelText}>{label}</span>
    </label>
  );
};

const checkBoxControl = css({
  alignItems: "center",
  display: "flex",
});

const checkBox = css({
  height: "24px",
  width: "24px",
});

const labelText = css({
  fontSize: "24px",
  marginLeft: "8px",
});
