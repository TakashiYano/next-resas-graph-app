import { type FC } from "react";

import { css } from "../../../styled-system/css";

export const Header: FC = () => {
  return (
    <header className={header}>
      <div className={container}>
        <h1 className={title}>RESAS Graph App</h1>
      </div>
    </header>
  );
};

const header = css({
  backgroundColor: "#b7b4b4",
  padding: "16px 0",
  width: "100%",
});

const container = css({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  margin: "0 auto",
  maxWidth: "1280px",
  padding: "0 4%",
});

const title = css({
  fontSize: "1.5rem",
  fontWeight: "bold",
  lineHeight: "2rem",
});
