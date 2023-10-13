import { useEffect, useReducer } from "react";
import useCountries, { Country, CountryDisplay } from "../../hooks/useCountries";
import { FilterData, Filters, FilterResult, FilterState, FilterAction, FilterActionType, SetCountriesPayload, SetCountryFilterPayload, filterContext } from "./FilterContext";
import { FilterOptions, filterOptionsContext } from "./FilterOptionsContext";



const createData: (countries: Country[]) => FilterData = (countries: Country[]) => {
    return countries
        .map<CountryDisplay>(({ name, code, languages }) => ({ name, code, languages: languages.map(language => language.name).join(', ') }))
        .reduce((acc, country) => {
            acc.countryByCode.set(country.code, country);
            return acc;
        }, { countryByCode: new Map<string, CountryDisplay>() })
}

const createFilterOptions: (countries: Country[]) => FilterOptions = (countries) => {
    return {
        countries: countries.map(({ name, code }) => ({ code, label: name }))
    }
}

const applyFilters: (data: FilterData, filters: Filters) => FilterResult = (data, filters) => {
    if (filters.countryCode !== undefined) {
        const country = data.countryByCode.get(filters.countryCode);
        return {
            countries: country ? [country] : []
        }
    }
    return {
        countries: Array.from(data.countryByCode.values())
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
            return {
                ...state,
                filters: { ...state.filters, countryCode: payload as SetCountryFilterPayload },
                result: applyFilters(state.data as FilterData, { countryCode: payload as SetCountryFilterPayload })
            }
        }
        default:
            return state;
    }
}
const initialFilterState: FilterState = { result: { countries: [] } };


export function FilterContextProvider({ children }: { children: React.ReactNode }) {
    const [filterState, dispatch] = useReducer(filterReducer, initialFilterState);
    const { countries, loading, error } = useCountries();
    useEffect(() => {
        dispatch({ type: FilterActionType.SET_COUNTRIES, payload: countries });
    }, [countries]);

    return (
        <filterContext.Provider value={{ result: filterState.result, dispatch, loading, error }}>
            <filterOptionsContext.Provider value={createFilterOptions(countries)}>
                {children}
            </filterOptionsContext.Provider>
        </filterContext.Provider>
    );
}