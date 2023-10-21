import { type FC } from "react";

import { css } from "../../../styled-system/css";

export const Header: FC = () => {
  return (
    <header className={header}>
      <div className={container}>
        <h1 className={title}>都道府県別の総人口推移グラフ</h1>
      </div>
    </header>
  );
};

const header = css({
  backgroundColor: "#b7b4b4",
  padding: "1rem 0",
  width: "100%",
});

const container = css({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  margin: "0 auto",
  maxWidth: "80rem",
  padding: "0 4%",
});

const title = css({
  fontSize: "1.5rem",
  fontWeight: "bold",
  lineHeight: "2rem",
});
