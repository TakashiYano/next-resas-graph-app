import { isPrefectures, type Prefecture } from "@/lib/prefecture/type";

const RESAS_ENDPOINT = "https://opendata.resas-portal.go.jp";

type PrefecturesApiResponse = {
  result: Prefecture[];
};

export const getPrefectures = async () => {
  const res = await fetch(`${RESAS_ENDPOINT}/api/v1/prefectures`, {
    headers: { "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY },
  });
  if (!res.ok) {
    throw new Error(`RESAS API response was not ok. status=${res.status}`);
  }
  const prefectures = (await res.json()) as PrefecturesApiResponse;
  if (!isPrefectures(prefectures)) {
    throw Error("API type error");
  }
  return prefectures.result;
};
