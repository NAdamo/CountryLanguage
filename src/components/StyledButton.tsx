import Button, { ButtonProps } from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';

function StyledButton(props: ButtonProps) {
    return (
        <Button
            startIcon={<AddIcon />}
            variant="text"
            disableRipple
            sx={{
                margin: "1rem",
                color: "rgba(0, 0, 0, 0.6)",
                textTransform: "none",
                fontSize: "12px",
            }}
            {...props}
        />
    );
}

export default StyledButton;