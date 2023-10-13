import { useContext, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import StyledButton from "./StyledButton";
import StyledHeader from "./StyledHeader";
import { filterContext } from "../contexts/FilterContext";
import { CountryLanguageContext } from "../contexts/CountryLanguageContext";



function CountryList() {
    const { result: { countries } } = useContext(filterContext);
    const { loading, error } = useContext(CountryLanguageContext);
    useEffect(() => { setCount(5) }, [countries])
    const [count, setCount] = useState<number | null>(5);
    const hasMore = count !== null && count < countries.length;
    const countriesToDisplay = hasMore ? countries.slice(0, count) : countries;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <>
            <StyledHeader> Results </StyledHeader>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Country</TableCell>
                        <TableCell>Languages</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {countriesToDisplay.map((country) => (<TableRow key={country.code}>
                        <TableCell>{country.name}</TableCell>
                        <TableCell>{country.languages}</TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
            {hasMore ? <StyledButton onClick={() => setCount(null)}>Show all</StyledButton> : null}
        </>
    );
}

export default CountryList;