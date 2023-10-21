import { isPopulationCategories, type PopulationCategory } from "@/lib/population/type";

const RESAS_ENDPOINT = "https://opendata.resas-portal.go.jp";

type QueryParam = {
  addArea?: string;
  cityCode: string;
  prefCode: number;
};

type PopulationApiResponse = {
  result: {
    boundaryYear: number;
    data: PopulationCategory[];
  };
};

export const getPopulations = async (searchParams?: QueryParam) => {
  const q = new URLSearchParams({
    cityCode: "-",
    prefCode: String(searchParams?.prefCode),
  }).toString();

  const res = await fetch(`${RESAS_ENDPOINT}/api/v1/population/composition/perYear?${q}`, {
    headers: { "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY },
  });
  if (!res.ok) {
    throw Error("総人口推移データの取得に失敗しました。");
  }

  const populations = (await res.json()) as PopulationApiResponse;
  if (!isPopulationCategories(populations)) {
    throw Error("想定しない総人口推移データが取得されました。");
  }

  return populations;
};
