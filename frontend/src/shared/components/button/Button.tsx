import React from "react";

import "./style.scss";

export function Button(props: IButtonProps) {
    return (
        <button {...props}>
            <span>{props.label}</span>
        </button>
    );
}

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}
