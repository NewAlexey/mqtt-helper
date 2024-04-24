import { observer } from "mobx-react-lite";
import React from "react";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import "./style.scss";

import { Switcher } from "src/shared/components/switcher/Switcher.tsx";
import { EditableHeading } from "src/view/pages/Testing/component/FunctionItem/heading/EditableHeading.tsx";

export const FunctionHeading = observer(
    ({
        id,
        isContentHide,
        functionTitle,
        setIsContentHide,
        removeFunctionModel,
        onChangeFunctionTitle,
    }: PropsType) => {
        return (
            <div className="form-heading__container">
                <EditableHeading
                    functionTitle={functionTitle}
                    onChangeFunctionTitle={onChangeFunctionTitle}
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

type PropsType = {
    id: string;
    functionTitle: string;
    isContentHide: boolean;
    removeFunctionModel: (id: string) => void;
    onChangeFunctionTitle: (title: string) => void;
    setIsContentHide: React.Dispatch<React.SetStateAction<boolean>>;
};
