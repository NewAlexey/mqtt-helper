import React from "react";
import { clsx } from "clsx";

import "./style.scss";

export function Button({
    icon,
    label,
    disabled,
    className,
    ...props
}: IButtonProps) {
    return (
        <button
            type={"button"}
            {...props}
            disabled={disabled}
            className={clsx(className, disabled && "button_disabled")}
        >
            <span>{label}</span>
            {icon && icon}
        </button>
    );
}

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    icon?: React.ReactElement;
}
