import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import useCountries from "../hooks/useCountries";
import StyledButton from "./StyledButton";
import StyledHeader from "./StyledHeader";



function CountryList() {
    const [count, setCount] = useState<number | null>(5)
    const { loading, error, countries, isShowAll } = useCountries(count);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    console.log(`count: ${count} countries.length: ${countries.length}`);

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
                    {countries.map((country) => (<TableRow key={country.code}>
                        <TableCell>{country.name}</TableCell>
                        <TableCell>{country.languages}</TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
            {isShowAll ? <StyledButton onClick={() => setCount(null)}>Show all</StyledButton> : null}
        </>
    );
}

export default CountryList;