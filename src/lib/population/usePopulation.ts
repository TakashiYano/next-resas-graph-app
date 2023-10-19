"use client";

import { useCallback, useReducer, type ChangeEvent } from "react";

import { type SeriesOptionsType } from "highcharts";

import { type PopulationCategories } from "@/lib/population/type";
import { getPopulations } from "@/lib/resas/population";

const ADD_POPULATION = "ADD_POPULATION";
const REMOVE_POPULATION = "REMOVE_POPULATION";

type Action = {
  payload?: PopulationCategories;
  prefName: string;
  type: string;
};

const initialState: SeriesOptionsType[] = [];

const reducer = (state: SeriesOptionsType[], action: Action) => {
  switch (action.type) {
    case ADD_POPULATION:
      const totalPopulation = action.payload?.result.data.find((category) => {
        return category.label === "総人口";
      });
      const population: SeriesOptionsType = {
        data: totalPopulation?.data.map((d) => {
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

  const handlePrefectureCheck = useCallback((prefCode: number, prefName: string) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        getPopulations({ cityCode: "-", prefCode }).then((data) => {
          return dispatch({ payload: data, prefName, type: ADD_POPULATION });
        });
      } else {
        dispatch({ prefName, type: REMOVE_POPULATION });
      }
    };
  }, []);

  return { handlePrefectureCheck, populations: state };
};
