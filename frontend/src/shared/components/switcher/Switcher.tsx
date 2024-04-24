import { clsx } from "clsx";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import "./style.scss";

export function Switcher({ onClick, state, className }: SwitcherProps) {
    return (
        <div className={clsx("switcher__container", className && className)}>
            {state ? (
                <RemoveRedEyeOutlinedIcon onClick={onClick} />
            ) : (
                <VisibilityOffOutlinedIcon onClick={onClick} />
            )}
        </div>
    );
}

type SwitcherProps = {
    className?: string;
    onClick: () => void;
    state: boolean;
};
