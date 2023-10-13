import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Stack, Autocomplete, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form"

import { FilterActionType, filterDispatchContext, filterOptionsContext } from "../../contexts/FilterContext";
import StyledHeader from "../StyledHeader";
import StyledButton from "../StyledButton";

const FilterZone: FunctionComponent = () => {
    const dispatch = useContext(filterDispatchContext)
    const { countries, languages } = useContext(filterOptionsContext)
    const [languageFilterCount, setLanguageFilterCount] = useState<number>(1)
    const { control, watch } = useForm()
    const watched = watch()

    useEffect(() => {
        const selectLanguageFilters = Object.values(watched).filter((value) => value !== undefined && value !== null && value !== "")
        if (selectLanguageFilters.length === 0) {
            dispatch({ type: FilterActionType.SET_LANGUAGE_FILTER, payload: undefined });
            return;
        }
        dispatch({ type: FilterActionType.SET_LANGUAGE_FILTER, payload: selectLanguageFilters });
    }, [watched, dispatch])
    return (
        <Stack spacing={2.5}>
            <StyledHeader>Filter</StyledHeader>
            <Autocomplete
                disablePortal
                id="country-filter"
                options={countries}
                isOptionEqualToValue={(option, value) => option.code === value.code}
                renderInput={(params) => <TextField {...params} label="Country to filter for" variant="standard" placeholder="search country" InputLabelProps={{ shrink: true }} />}
                onChange={(_event, value) => dispatch({ type: FilterActionType.SET_COUNTRY_FILTER, payload: value?.code })}
                placeholder="Select a country"
            />
            {
                Array.from({ length: languageFilterCount }, (_, i) => i).map((i) => (
                    <Controller
                        control={control}
                        name={`language-filter-${i}`}
                        key={i}
                        render={({ field }) => (
                            <Autocomplete {...field}
                                disablePortal
                                id={`language-filter-${i}`}
                                options={languages}
                                isOptionEqualToValue={(option, value) => option.code === value.code}
                                renderInput={(params) => <TextField {...params} label="Language to filter for" variant="standard" placeholder="search language" InputLabelProps={{ shrink: true }} />}
                                onChange={(_event, value) => field.onChange(value?.code)}
                                placeholder="Select a language"
                                value={field.value?.code}
                            />)}
                    />
                ))
            }
            <StyledButton onClick={() => setLanguageFilterCount(languageFilterCount + 1)}>Add language</StyledButton>
        </Stack>
    );
};

export default FilterZone;