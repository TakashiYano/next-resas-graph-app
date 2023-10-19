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
    throw new Error(`RESAS API res was not ok. status=${res.status}`);
  }
  const populations = (await res.json()) as PopulationApiResponse;
  if (!isPopulationCategories(populations)) {
    throw Error("API type error");
  }
  return populations;
};
