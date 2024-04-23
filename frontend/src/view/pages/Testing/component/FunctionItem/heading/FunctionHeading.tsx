import { observer } from "mobx-react-lite";
import React from "react";

import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import "./style.scss";

import { Switcher } from "src/shared/components/switcher/Switcher.tsx";

export const FunctionHeading = observer(
    ({
        id,
        isContentHide,
        setIsContentHide,
        removeFunctionModel,
    }: PropsType) => {
        return (
            <div className="form-heading__container">
                <Typography variant="h3" fontSize={20} fontWeight={500}>
                    Название функции для тестирования mqtt
                </Typography>
                <Switcher
                    state={isContentHide}
                    onClick={() => setIsContentHide(!isContentHide)}
                />
                <DeleteForeverIcon
                    onClick={() => removeFunctionModel(id)}
                    className="remove-icon"
                    fontSize="large"
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
