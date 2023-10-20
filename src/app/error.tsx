"use client";

import { useEffect } from "react";

import { Alert } from "@/component/Alert";

import { css } from "../../styled-system/css";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={errorContainer}>
      <Alert type="error">{error.message}</Alert>
      <button
        className={errorButton}
        onClick={() => {
          return reset();
        }}
      >
        もう一度ためす
      </button>
    </div>
  );
};

export default Error;

const errorContainer = css({
  display: "inline-block",
  textAlign: "center",
});

const errorButton = css({
  cursor: "pointer",
  margin: "1rem 0",
  textDecoration: "underline",
});
