import { Header } from "@/component/Header";

import "./index.css";

import type { Metadata } from "next";

import { css } from "../../styled-system/css";

export const metadata: Metadata = {
  title: "都道府県別の総人口推移グラフ",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main className={main}>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;

const main = css({
  margin: "1.5rem 0",
  textAlign: "center",
});
