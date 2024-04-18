import { ChangeEvent } from "react";

import "./style.scss";

export function TextInput({
    id,
    label,
    onChange,
    value,
    placeholder,
}: ITextInputProps) {
    return (
        <div className="text-input_container">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="text-input"
            />
        </div>
    );
}

interface ITextInputProps {
    id: string;
    label: string;
    value: string;
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
