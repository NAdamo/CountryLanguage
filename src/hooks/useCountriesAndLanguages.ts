import { ApolloError, gql, useQuery } from "@apollo/client";
import { useMemo } from "react";

export type Language = {
    code: string;
    name: string;
}

export type Country = {
    code: string;
    emoji: string;
    name: string;
    languages: Language[];
}

type GetCountriesAndLanguages = {
    countries: Country[];
    languages: Language[];
}

export type CountryDisplay = {
    code: string;
    name: string;
    languages: string;
}

export type CountryFilter = {
    code?: string;
}

const GET_COUNTRIES = gql`
    query GetCountriesAndLanguages{
        countries{
            code
            emoji
            name
            languages {
            code
            name
            }
        }
        languages{
            code
            name
        }
    }

`

function useCountriesAndLanguages(): { loading: boolean, error: ApolloError | undefined, countries: Country[], languages: Language[] } {
    const { loading, error, data } = useQuery<GetCountriesAndLanguages>(GET_COUNTRIES);


    const countries: Country[] = useMemo(() => {
        return (data ? data.countries : []);
    }, [data])

    const languages: Language[] = useMemo(() => {
        return (data ? data.languages : []);
    }, [data])
    return {
        loading,
        error,
        countries,
        languages
    }
}

export default useCountriesAndLanguages;