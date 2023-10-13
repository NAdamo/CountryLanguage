import { createContext } from "react";
import { Country, Language } from "../hooks/useCountriesAndLanguages";
import { ApolloError } from "@apollo/client";

type CountryLanguageContext = {
    countries: Country[];
    languages: Language[];
    loading: boolean;
    error: ApolloError | undefined;
}
export const CountryLanguageContext = createContext<CountryLanguageContext>({ countries: [], languages: [], loading: false, error: undefined });