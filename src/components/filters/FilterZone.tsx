import { FunctionComponent, useContext } from "react";
import StyledHeader from "../StyledHeader";
import { Stack, Autocomplete, TextField } from "@mui/material";
import { FilterActionType, filterContext, filterOptionsContext } from "../../contexts/FilterContext";

const FilterZone: FunctionComponent = () => {
    const { dispatch } = useContext(filterContext)
    const { countries } = useContext(filterOptionsContext)
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
        </Stack>
    );
};

export default FilterZone;