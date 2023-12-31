"use client";

import { useCallback, useReducer, useState, type ChangeEvent } from "react";

import { type SeriesOptionsType } from "highcharts";

import { type PopulationCategory } from "@/lib/population/type";
import { getPopulations } from "@/lib/resas/population";

const ADD_POPULATION = "ADD_POPULATION";
const REMOVE_POPULATION = "REMOVE_POPULATION";

type Action = {
  payload?: PopulationCategory;
  prefName: string;
  type: string;
};

const initialState: SeriesOptionsType[] = [];

const reducer = (state: SeriesOptionsType[], action: Action) => {
  switch (action.type) {
    case ADD_POPULATION:
      const population: SeriesOptionsType = {
        data: action.payload?.data.map((d) => {
          return [d.year, d.value];
        }),
        name: action.prefName,
        type: "line",
      };
      return [...state, population];
    case REMOVE_POPULATION:
      return state.filter((s) => {
        return s.name !== action.prefName;
      });
    default:
      return state;
  }
};

export const usePopulation = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePrefectureCheck = useCallback((prefCode: number, prefName: string) => {
    return async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setIsLoading(true);
        try {
          const data = await getPopulations({ cityCode: "-", prefCode });
          const totalPopulation = data.result.data.find((category) => {
            return category.label === "総人口";
          });
          if (totalPopulation === undefined) {
            throw Error("総人口推移データが存在しません。");
          }
          dispatch({
            payload: totalPopulation,
            prefName,
            type: ADD_POPULATION,
          });
          setIsLoading(false);
        } catch (error) {
          setErrorMessage(`${prefName}の総人口推移データの取得に失敗しました。`);
          console.error(error);
        }
        setIsLoading(false);
      } else {
        dispatch({ prefName, type: REMOVE_POPULATION });
      }
    };
  }, []);

  const handleResetError = useCallback(() => {
    setErrorMessage("");
  }, []);

  return {
    handlePrefectureCheck,
    handleResetError,
    isChecking: isLoading,
    populationErrMsg: errorMessage,
    populations: state,
  };
};
