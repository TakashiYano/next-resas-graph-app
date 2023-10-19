export type Population = {
  value: number;
  year: number;
};

export type PopulationCategory = {
  data: Population[];
  label: string;
};

export type PopulationCategories = {
  message: string | null;
  result: {
    boundaryYear: number;
    data: PopulationCategory[];
  };
};

const isPopulation = (arg: unknown): arg is Population => {
  const p = arg as Population;

  return typeof p.year === "number" && typeof p.value === "number";
};

const isPopulationCategory = (arg: unknown): arg is PopulationCategory => {
  const pc = arg as PopulationCategory;

  return (
    typeof pc.label === "string" &&
    pc.data.every((p) => {
      return isPopulation(p);
    })
  );
};

const isPopulationCategories = (args: unknown): args is PopulationCategories => {
  const pcs = args as PopulationCategories;

  return (
    (typeof pcs.message === "string" || pcs.message === null) &&
    typeof pcs.result.boundaryYear === "number" &&
    pcs.result.data.every((pc) => {
      return isPopulationCategory(pc);
    })
  );
};

export { isPopulation, isPopulationCategory, isPopulationCategories };
