import { clsx } from "clsx";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import IconButton from "@mui/material/IconButton";

import "./style.scss";

export function Switcher({ onClick, state, className }: SwitcherProps) {
    return (
        <IconButton
            onClick={onClick}
            className={clsx("switcher__container", className && className)}
        >
            {state ? (
                <RemoveRedEyeOutlinedIcon />
            ) : (
                <VisibilityOffOutlinedIcon />
            )}
        </IconButton>
    );
}

type SwitcherProps = {
    className?: string;
    onClick: () => void;
    state: boolean;
};
