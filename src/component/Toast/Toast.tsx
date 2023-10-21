"use client";

import { type FC, type MouseEventHandler, type ReactNode } from "react";

import { css, cx } from "../../../styled-system/css";

type Props = {
  children: ReactNode;
  autoHideDuration?: number;
  isOpen: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
};

export const Toast: FC<Props> = ({ children, autoHideDuration = 3000, isOpen, onClose }) => {
  if (isOpen) {
    setTimeout(onClose, autoHideDuration);
  }

  return <div className={cx(toast, isOpen && toastOpen)}>{children}</div>;
};

const toast = css({
  bottom: "1.5rem",
  display: "flex",
  justifyContent: "center",
  left: "1.5rem",
  position: "fixed",
  right: "1.5rem",
  visibility: "hidden",
});

const toastOpen = css({
  visibility: "visible",
});
