import { Typography } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

const StyledHeader: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    return (
        <Typography variant="button" display="block" gutterBottom> {children} </Typography>
    );
}
export default StyledHeader;