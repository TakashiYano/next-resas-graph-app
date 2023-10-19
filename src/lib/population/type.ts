export type Population = {
  value: number;
  year: number;
};

export type PopulationCategory = {
  data: Population[];
  label: string;
};

export type Populations = {
  message: string | null;
  result: {
    boundaryYear: number;
    data: PopulationCategory[];
  };
};
