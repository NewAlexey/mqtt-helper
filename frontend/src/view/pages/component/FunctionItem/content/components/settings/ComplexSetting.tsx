import { observer } from "mobx-react-lite";
import React, { ChangeEvent } from "react";

import TextField from "@mui/material/TextField";
import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { FunctionExecutionMode } from "src/store/FunctionModel.ts";
import { FrequencySetting } from "src/view/pages/component/FunctionItem/content/components/settings/FrequencySetting.tsx";
import { ErrorDataType } from "src/view/pages/component/FunctionItem/useErrorData.ts";

const functionExecutionModeList: { value: string; description: string }[] = [
    { value: "decreasing", description: "Убывающая" },
    { value: "increasing", description: "Возрастающая" },
    { value: "sinusoidal", description: "Синусоидальная" },
];

const numericRegExpt = new RegExp(/^[\d.]*$/);

export const ComplexSetting = observer(
    ({
        frequency,
        isFetching,
        payloadStep,
        setErrorData,
        executionMode,
        payloadStepError,
        onChangeFrequency,
        onChangePayloadStep,
        onChangeExecutionMode,
    }: PropsType) => {
        const payloadStepInputHandler = (
            event: ChangeEvent<HTMLInputElement>,
        ) => {
            const value = event.target.value;

            if (!numericRegExpt.test(value)) {
                return;
            }

            setErrorData((prevValue) => ({
                ...prevValue,
                payloadStepError: "",
            }));
            //TODO change to string...
            onChangePayloadStep(Number(value));
        };

        return (
            <>
                <div className="setting-item__container">
                    <InputLabel id="function-execution-mode">
                        Тип функции выполнения
                    </InputLabel>
                    <Select
                        size="small"
                        labelId="function-execution-mode"
                        disabled={isFetching}
                        value={executionMode}
                        onChange={(
                            event: SelectChangeEvent<FunctionExecutionMode>,
                        ) =>
                            onChangeExecutionMode(
                                event.target.value as FunctionExecutionMode,
                            )
                        }
                        className="execution-mode_select"
                    >
                        {functionExecutionModeList.map((menuItem) => (
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
    payloadStep: number;
    frequency: number;
    isFetching: boolean;
    payloadStepError: string;
    setErrorData: React.Dispatch<React.SetStateAction<ErrorDataType>>;
    executionMode: FunctionExecutionMode;
    onChangeFrequency: (frequency: number) => void;
    onChangePayloadStep: (payloadStep: number) => void;
    onChangeExecutionMode: (executionMode: FunctionExecutionMode) => void;
};
