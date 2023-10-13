import { createContext } from "react";

export type FilterOption = {
    code: string;
    label: string;
}

export type FilterOptions = {
    countries: FilterOption[];
    languages: FilterOption[];
}

type FilterOptionsContext = FilterOptions

export const filterOptionsContext = createContext<FilterOptionsContext>({ countries: [], languages: [] });