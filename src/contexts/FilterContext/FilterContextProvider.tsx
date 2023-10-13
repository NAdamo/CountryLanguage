import { useContext, useEffect, useReducer } from "react";
import { Country, CountryDisplay } from "../../hooks/useCountriesAndLanguages";
import { FilterData, Filters, FilterResult, FilterState, FilterAction, FilterActionType, SetCountriesPayload, SetCountryFilterPayload, filterContext, SetLanguageFilterPayload, filterDispatchContext } from "./FilterContext";
import { CountryLanguageContext } from "../CountryLanguageContext";




const createData: (countries: Country[]) => FilterData = (countries: Country[]) => {
    return countries
        .reduce((acc, { code, name, languages }) => {
            const country: CountryDisplay = { code, name, languages: languages.map(({ name }) => name).join(", ") };
            acc.countriesByCode.set(code, country);
            languages.forEach(({ code }) => {
                const countries = acc.countriesByLanguage.get(code) ?? new Set<CountryDisplay>();
                countries.add(country);
                acc.countriesByLanguage.set(code, countries);
            })
            return acc;
        }, { countriesByCode: new Map<string, CountryDisplay>(), countriesByLanguage: new Map<string, Set<CountryDisplay>>() })
}

const applyFilters: (data: FilterData, filters: Filters) => FilterResult = (data, { countryCode, languageCodes }) => {
    if (data === undefined) return { countries: [] };
    const hasLanguageFilter = languageCodes !== undefined && languageCodes.length > 0;
    const countries: CountryDisplay[] = hasLanguageFilter ? languageCodes
        .map((code) => data.countriesByLanguage.get(code) ?? new Set<CountryDisplay>())
        .reduce((acc, selectedCountries) => {
            if (selectedCountries === undefined) return acc;
            if (acc.length === 0) return selectedCountries ? Array.from(selectedCountries) : [];
            return acc.filter((country) => selectedCountries.has(country));
            //    //if (countries !== undefined) {
            //    //countries.forEach((country) => acc.add(country));
            //    //    const countries = data.countriesByLanguage.get(code);
            //    //}
        }, [] as CountryDisplay[])
        : []

    if (countryCode !== undefined) {
        const country = data.countriesByCode.get(countryCode);
        if (hasLanguageFilter) {
            // return [];
            return { countries: countries.filter(({ code }) => code === countryCode) };
        }
        return {
            countries: country ? [country] : []
        }
    }
    if (hasLanguageFilter) return { countries };
    return {
        countries: Array.from(data.countriesByCode.values())
    }
}


const filterReducer: (state: FilterState, action: FilterAction) => FilterState = (state: FilterState, action: FilterAction) => {
    const { type, payload } = action;
    switch (type) {
        case FilterActionType.SET_COUNTRIES:
            // eslint-disable-next-line no-case-declarations
            const data = createData(payload as SetCountriesPayload || []);
            return {
                ...state,
                result: applyFilters(data, state.filters || {}),
                data: data
            }
        case FilterActionType.SET_COUNTRY_FILTER: {
            const filters = { ...state.filters, countryCode: payload as SetCountryFilterPayload };
            return {
                ...state,
                filters: filters,
                result: applyFilters(state.data as FilterData, filters)
            }
        }
        case FilterActionType.SET_LANGUAGE_FILTER: {
            const filters = { ...state.filters, languageCodes: payload as SetLanguageFilterPayload };
            return {
                ...state,
                filters: filters,
                result: applyFilters(state.data as FilterData, filters)
            }
        //return state;
        }
        default:
            return state;
    }
}
const initialFilterState: FilterState = { result: { countries: [] } };


export function FilterContextProvider({ children }: { children: React.ReactNode }) {
    const [filterState, dispatch] = useReducer(filterReducer, initialFilterState);
    const { countries } = useContext(CountryLanguageContext);
    useEffect(() => {
        dispatch({ type: FilterActionType.SET_COUNTRIES, payload: countries });
    }, [countries]);

    return (
        <filterContext.Provider value={{ result: filterState.result }}>
            <filterDispatchContext.Provider value={dispatch}>
                {children}
            </filterDispatchContext.Provider>
        </filterContext.Provider>
    );
}