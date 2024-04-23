import { observer } from "mobx-react-lite";
import React from "react";

import Typography from "@mui/material/Typography";

import { FunctionModelStore } from "src/store/FunctionModelStore.ts";
import { ModeSelect } from "src/view/pages/component/FunctionItem/content/components/ModeSelect.tsx";
import { ComplexSetting } from "src/view/pages/component/FunctionItem/content/components/settings/ComplexSetting.tsx";
import { FrequencySetting } from "src/view/pages/component/FunctionItem/content/components/settings/FrequencySetting.tsx";
import { ErrorDataType } from "src/view/pages/component/FunctionItem/useErrorData.ts";

export const FunctionSetting = observer(
    ({
        functionStore,
        payloadStepError,
        setErrorData,
        clearErrorData,
    }: PropsType) => {
        const { functionData, onChangeFrequency, isFetching } = functionStore;

        const {
            frequency,
            mode,
            onChangeMode,
            payloadStep,
            onChangePayloadStep,
            implementation,
            onChangeImplementation,
        } = functionData;

        return (
            <div className="form-setting__container boxed-container">
                <Typography
                    variant="h4"
                    fontSize={18}
                    fontWeight={500}
                    align="left"
                >
                    Настройки запроса
                </Typography>
                <div className="setting-list__container">
                    <ModeSelect
                        mode={mode}
                        isFetching={isFetching}
                        onChangeMode={onChangeMode}
                        clearErrorData={clearErrorData}
                    />
                    {mode === "periodic" && (
                        <FrequencySetting
                            frequency={frequency}
                            isFetching={isFetching}
                            onChangeFrequency={onChangeFrequency}
                        />
                    )}

                    {mode === "complex" && (
                        <ComplexSetting
                            frequency={frequency}
                            isFetching={isFetching}
                            payloadStep={payloadStep}
                            implementation={implementation}
                            setErrorData={setErrorData}
                            clearErrorData={clearErrorData}
                            payloadStepError={payloadStepError}
                            onChangeFrequency={onChangeFrequency}
                            onChangePayloadStep={onChangePayloadStep}
                            onChangeImplementation={onChangeImplementation}
                        />
                    )}
                </div>
                {payloadStepError ? (
                    <Typography className="payload-step_error color_error">
                        {payloadStepError}
                    </Typography>
                ) : null}
            </div>
        );
    },
);

type PropsType = {
    functionStore: FunctionModelStore;
    payloadStepError: string;
    clearErrorData: () => void;
    setErrorData: React.Dispatch<React.SetStateAction<ErrorDataType>>;
};
