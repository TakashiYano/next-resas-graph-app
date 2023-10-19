import { Header } from "@/component/Header";

import "./index.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RESAS Graph App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
