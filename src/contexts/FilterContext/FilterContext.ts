import { ApolloError } from "@apollo/client";
import { CountryDisplay, Country } from "../../hooks/useCountries";
import { createContext } from "react";

export enum FilterActionType {
    SET_COUNTRIES = "SET_COUNTRIES",
    SET_COUNTRY_FILTER = "SET_COUNTRY_FILTER",
}

export type Filters = {
    countryCode?: string;
}

export type FilterData = {
    countryByCode: Map<string, CountryDisplay>;
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
    result: FilterResult,
    loading?: boolean,
    error?: ApolloError | undefined,
    dispatch: React.Dispatch<FilterAction>,
};

export type SetCountriesPayload = Country[];
export type SetCountryFilterPayload = string | undefined;

export interface FilterAction {
    type: FilterActionType;
    payload: SetCountriesPayload | SetCountryFilterPayload;
}

export const filterContext = createContext<FilterContext>({ result: { countries: [] }, dispatch: () => { } });