import { type ComponentProps, type FC } from "react";

import { css } from "../../../styled-system/css";

type Props = {
  label: string;
  onChange: ComponentProps<"input">["onChange"];
};

export const CheckBox: FC<Props> = ({ label, onChange }) => {
  return (
    <label className={checkBoxControl}>
      <input className={checkBox} type="checkbox" onChange={onChange} />
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
