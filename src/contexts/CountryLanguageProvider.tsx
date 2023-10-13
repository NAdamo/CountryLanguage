import useCountriesAndLanguages from "../hooks/useCountriesAndLanguages";
import { CountryLanguageContext } from "./CountryLanguageContext";


export function CountryLanguageProvider({ children }: { children: React.ReactNode }) {
    const { countries, loading, error, languages } = useCountriesAndLanguages();
    return (
        <CountryLanguageContext.Provider value={{ countries, languages, error, loading }}>
            {children}
        </CountryLanguageContext.Provider>
    )
}