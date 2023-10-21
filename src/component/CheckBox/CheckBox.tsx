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
  cursor: "pointer",
  display: "flex",
});

const checkBox = css({
  backgroundColor: "#f3f4f6",
  borderColor: "#d1d5db",
  borderRadius: "0.25rem",
  color: "#2563eb",
  cursor: "pointer",
  height: "1rem",
  width: "1rem",
});

const labelText = css({
  fontSize: "1rem",
  marginLeft: "0.5rem",
});
