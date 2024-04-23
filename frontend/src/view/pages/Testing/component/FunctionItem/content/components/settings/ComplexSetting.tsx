import { observer } from "mobx-react-lite";
import React, { ChangeEvent } from "react";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material";

import { FrequencySetting } from "src/view/pages/Testing/component/FunctionItem/content/components/settings/FrequencySetting.tsx";
import { ErrorDataType } from "src/view/pages/Testing/component/FunctionItem/useErrorData.ts";
import { numericRegExp } from "src/utils/numericRegExp.ts";
import { FunctionImplementation } from "src/model/FunctionModel.ts";

const functionImplementationList: { value: string; description: string }[] = [
    { value: "increasing", description: "Возрастающая" },
    { value: "decreasing", description: "Убывающая" },
    { value: "sinusoidal", description: "Синусоидальная" },
];

export const ComplexSetting = observer(
    ({
        frequency,
        isFetching,
        payloadStep,
        setErrorData,
        implementation,
        clearErrorData,
        payloadStepError,
        onChangeFrequency,
        onChangePayloadStep,
        onChangeImplementation,
    }: PropsType) => {
        const payloadStepInputHandler = (
            event: ChangeEvent<HTMLInputElement>,
        ) => {
            const value = event.target.value;

            if (!numericRegExp.test(value)) {
                return;
            }

            setErrorData((prevValue) => ({
                ...prevValue,
                payloadStepError: "",
            }));
            onChangePayloadStep(value);
        };

        return (
            <>
                <div className="setting-item__container">
                    <InputLabel id="function-implementation-mode">
                        Тип выполнения функции
                    </InputLabel>
                    <Select
                        size="small"
                        labelId="function-implementation-mode"
                        disabled={isFetching}
                        value={implementation}
                        onChange={(
                            event: SelectChangeEvent<FunctionImplementation>,
                        ) => {
                            clearErrorData();
                            onChangeImplementation(
                                event.target.value as FunctionImplementation,
                            );
                        }}
                        className="implementation-mode_select"
                    >
                        {functionImplementationList.map((menuItem) => (
                            <MenuItem
                                key={menuItem.value}
                                value={menuItem.value}
                            >
                                {menuItem.description}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <FrequencySetting
                    frequency={frequency}
                    isFetching={isFetching}
                    onChangeFrequency={onChangeFrequency}
                />
                <div className="setting-item__container">
                    <InputLabel
                        id="payload-step"
                        error={Boolean(payloadStepError)}
                    >
                        Шаг payload запроса
                    </InputLabel>
                    <TextField
                        id="payload-step"
                        variant="outlined"
                        size="small"
                        error={Boolean(payloadStepError)}
                        className="payload-step_input"
                        disabled={isFetching}
                        value={String(payloadStep)}
                        onChange={payloadStepInputHandler}
                    />
                </div>
            </>
        );
    },
);

type PropsType = {
    payloadStep: string;
    frequency: number;
    isFetching: boolean;
    payloadStepError: string;
    clearErrorData: () => void;
    setErrorData: React.Dispatch<React.SetStateAction<ErrorDataType>>;
    implementation: FunctionImplementation;
    onChangeFrequency: (frequency: number) => void;
    onChangePayloadStep: (payloadStep: string) => void;
    onChangeImplementation: (implementation: FunctionImplementation) => void;
};
