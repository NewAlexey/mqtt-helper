import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import "./style.scss";

export function Switcher({ onClick, state }: SwitcherProps) {
    return (
        <div className="switcher__container">
            {state ? (
                <RemoveRedEyeOutlinedIcon onClick={onClick} />
            ) : (
                <VisibilityOffOutlinedIcon onClick={onClick} />
            )}
        </div>
    );
}

type SwitcherProps = {
    onClick: () => void;
    state: boolean;
};
