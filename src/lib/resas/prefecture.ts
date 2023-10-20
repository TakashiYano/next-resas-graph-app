import { isPrefectures, type Prefecture } from "@/lib/prefecture/type";

const RESAS_ENDPOINT = "https://opendata.resas-portal.go.jp";

type PrefecturesApiResponse = {
  result: Prefecture[];
};

export const getPrefectures = async () => {
  const res = await fetch(`${RESAS_ENDPOINT}/api/v1/prefectures`, {
    cache: "no-store",
    headers: { "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY },
  });

  if (!res.ok) {
    throw Error("都道府県一覧の取得に失敗しました。");
  }

  const prefectures = (await res.json()) as PrefecturesApiResponse;

  if (!isPrefectures(prefectures)) {
    throw Error("想定しない都道府県一覧が取得されました。");
  }

  return prefectures.result;
};
