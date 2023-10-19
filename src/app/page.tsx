import { Main } from "@/app/_component/Main";
import { getPrefectures } from "@/lib/resas/prefecture";

const Home = async () => {
  const prefectures = await getPrefectures();

  return <Main prefectures={prefectures} />;
};

export default Home;
