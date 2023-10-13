import { useContext } from "react";
import { FilterOptions, filterOptionsContext } from "./FilterOptionsContext"
import { CountryLanguageContext } from "../CountryLanguageContext";
import { Country, Language } from "../../hooks/useCountriesAndLanguages";


const createFilterOptions: (countries: Country[], languages: Language[]) => FilterOptions = (countries, languages) => {
    return {
        countries: countries.map(({ name, code }) => ({ code, label: name })),
        languages: languages.map(({ name, code }) => ({ code, label: name }))
    }
}

export function FilterOptionsContextProvider({ children }: { children: React.ReactNode }) {
    const { countries, languages } = useContext(CountryLanguageContext);
    return (
        <filterOptionsContext.Provider value={{ ...createFilterOptions(countries, languages) }}>
            {children}
        </filterOptionsContext.Provider>
    )
}