import { ApolloError, gql, useQuery } from "@apollo/client";
import { useMemo } from "react";

type Country = {
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

type CountryDisplay = {
    code: string;
    name: string;
    languages: string;
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

function useCountries(count: number | null): { loading: boolean, error: ApolloError | undefined, countries: CountryDisplay[], isShowAll: boolean } {
    const { loading, error, data } = useQuery<GetCountries>(GET_COUNTRIES);

    const countries: CountryDisplay[] = useMemo(() => {
        return (data ? data.countries.map((country) => {
            return {
                name: country.name,
                languages: country.languages.map((language) => language.name).join(", "),
                code: country.code
            }
        }) : [])
    }, [data])

    return {
        loading,
        error,
        countries: (count ? countries.slice(0, count) : countries),
        isShowAll: !!count && count < countries.length
    }
}

export default useCountries;