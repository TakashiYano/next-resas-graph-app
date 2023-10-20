import { type FC } from "react";

import { css, cx } from "../../../styled-system/css";

type Props = {
  children: React.ReactNode;
  type: "info" | "error";
};

export const Alert: FC<Props> = ({ children, type }) => {
  return (
    <div
      className={cx(
        alert,
        alertLayout,
        type === "info" && alertInfo,
        type === "error" && alertError,
      )}
    >
      <div
        className={cx(
          alertType,
          type === "info" && alertInfoType,
          type === "error" && alertErrorType,
        )}
      >
        {type}
      </div>
      {children}
    </div>
  );
};

const alert = css({
  borderRadius: "0.75rem",
  padding: "0.75rem",
});

const alertLayout = css({
  display: "flex",
});

const alertType = css({
  fontWeight: "bold",
  marginRight: "1rem",
  textTransform: "capitalize",
});

const alertInfo = css({
  backgroundColor: "#e5f6fd",
  border: "1px solid #03a9f4",
});

const alertInfoType = css({
  color: "#03a9f4",
});

const alertError = css({
  backgroundColor: "#fdeded",
  border: "1px solid #ef5350",
});

const alertErrorType = css({
  color: "#ef5350",
});
