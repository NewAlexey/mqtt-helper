import { observer } from "mobx-react-lite";
import React from "react";

import "./style.scss";

import { Switcher } from "src/shared/components/switcher/Switcher.tsx";
import { RemoveIcon } from "src/shared/components/icons/RemoveIcon.tsx";

export const FunctionHeading = observer(
    ({
        id,
        isContentHide,
        setIsContentHide,
        removeFunctionModel,
    }: PropsType) => {
        return (
            <div className="form-heading__container">
                <h5>Название функции для тестирования mqtt.</h5>
                <Switcher
                    state={isContentHide}
                    onClick={() => setIsContentHide(!isContentHide)}
                />
                <RemoveIcon
                    onClick={() => removeFunctionModel(id)}
                    className="remove-icon"
                />
            </div>
        );
    },
);

type PropsType = {
    id: string;
    isContentHide: boolean;
    setIsContentHide: React.Dispatch<React.SetStateAction<boolean>>;
    removeFunctionModel: (id: string) => void;
};
