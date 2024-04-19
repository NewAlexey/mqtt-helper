import React from "react";

import "./style.scss";

export function Button({ icon, label, ...props }: IButtonProps) {
    return (
        <button type={"button"} {...props}>
            <span>{label}</span>
            {icon && icon}
        </button>
    );
}

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    icon?: React.ReactElement;
}
