import { ApolloError, gql, useQuery } from "@apollo/client";
import { useMemo } from "react";

export type Country = {
    code: string;
    emoji: string;
    name: string;
    languages: {
        code: string;
        name: string;
    }[];
}

type GetCountries = {
    countries: Country[];
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
    query GetCountries{
        countries{
            code
            emoji
            name
            languages {
            code
            name
            }
        }
    }

`

function useCountries(): { loading: boolean, error: ApolloError | undefined, countries: Country[] } {
    const { loading, error, data } = useQuery<GetCountries>(GET_COUNTRIES);


    const countries: Country[] = useMemo(() => {
        return (data ? data.countries : []);
    }, [data])

    return {
        loading,
        error,
        countries
    }
}

export default useCountries;