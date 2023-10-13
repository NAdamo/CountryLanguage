import { CountryDisplay, Country } from "../../hooks/useCountriesAndLanguages";
import { createContext } from "react";

export enum FilterActionType {
    SET_COUNTRIES = "SET_COUNTRIES",
    SET_COUNTRY_FILTER = "SET_COUNTRY_FILTER",
    SET_LANGUAGE_FILTER = "SET_LANGUAGE_FILTER"
}

export type Filters = {
    countryCode?: string;
    languageCodes?: string[];
}

export type FilterData = {
    countriesByCode: Map<string, CountryDisplay>;
    countriesByLanguage: Map<string, Set<CountryDisplay>>;
}

export type FilterResult = {
    countries: CountryDisplay[];
}

export type FilterState = {
    filters?: Filters
    result: FilterResult
    data?: FilterData
}

export type FilterContext = {
    result: FilterResult
};

export type SetCountriesPayload = Country[];
export type SetCountryFilterPayload = string | undefined;
export type SetLanguageFilterPayload = string[];

export interface FilterAction {
    type: FilterActionType;
    payload: SetCountriesPayload | SetCountryFilterPayload | SetLanguageFilterPayload;
}

export const filterContext = createContext<FilterContext>({ result: { countries: [] } });
export const filterDispatchContext = createContext<React.Dispatch<FilterAction>>(() => { });