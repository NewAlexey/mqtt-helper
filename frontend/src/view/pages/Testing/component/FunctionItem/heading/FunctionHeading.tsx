import { observer } from "mobx-react-lite";
import React from "react";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import "./style.scss";

import { Switcher } from "src/shared/components/switcher/Switcher.tsx";
import {
    EditableHeading,
    EditableHeadingProps,
} from "src/view/pages/Testing/component/FunctionItem/heading/EditableHeading.tsx";

export const FunctionHeading = observer(
    ({
        id,
        isContentHide,
        functionTitle,
        isFunctionSave,
        saveFunctionModel,
        setIsContentHide,
        removeFunctionModel,
        onChangeFunctionTitle,
    }: PropsType) => {
        return (
            <div className="form-heading__container">
                <EditableHeading
                    id={id}
                    functionTitle={functionTitle}
                    onChangeFunctionTitle={onChangeFunctionTitle}
                    isFunctionSave={isFunctionSave}
                    saveFunctionModel={saveFunctionModel}
                />
                <Switcher
                    className="right-alignment"
                    state={isContentHide}
                    onClick={() => setIsContentHide(!isContentHide)}
                />
                <DeleteForeverIcon
                    onClick={() => removeFunctionModel(id)}
                    className="heading_remove-icon"
                    fontSize="large"
                />
            </div>
        );
    },
);

type PropsType = EditableHeadingProps & {
    isContentHide: boolean;
    removeFunctionModel: (id: string) => void;
    setIsContentHide: React.Dispatch<React.SetStateAction<boolean>>;
};
