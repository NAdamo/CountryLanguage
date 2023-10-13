import { createContext } from "react";

export type FilterOption = {
    code: string;
    label: string;
}

export type FilterOptions = {
    countries: FilterOption[];
}

export const filterOptionsContext = createContext<FilterOptions>({ countries: [] });