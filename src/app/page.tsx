import { PrefectureFieldset } from "@/app/_component/Prefecture";

const prefectures = [{ prefCode: 1, prefName: "北海道" }];

export default function Home() {
  return <PrefectureFieldset prefectures={prefectures} />;
}
