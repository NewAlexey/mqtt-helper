import { useState } from "react";
import { observer } from "mobx-react-lite";
import { clsx } from "clsx";

import "./style.scss";

import { FunctionModel } from "src/store/FunctionModel.ts";
import { FunctionHeading } from "src/view/pages/component/FunctionItem/heading/FunctionHeading.tsx";
import { FunctionData } from "src/view/pages/component/FunctionItem/content/FunctionData.tsx";
import { FunctionSetting } from "src/view/pages/component/FunctionItem/content/FunctionSetting.tsx";
import { ActionContainer } from "src/view/pages/component/FunctionItem/content/ActionContainer.tsx";
import { SensorData } from "src/store/FunctionModelListStore.ts";
import { useErrorData } from "src/view/pages/component/FunctionItem/useErrorData.ts";

type FunctionItemPropsType = {
    sensorDataList: SensorData[];
    functionModel: FunctionModel;
    removeFunctionModel: (id: string) => void;
};

export const FunctionItem = observer(
    ({
        functionModel,
        removeFunctionModel,
        sensorDataList,
    }: FunctionItemPropsType) => {
        const [isContentHide, setIsContentHide] = useState(false);
        const { errorData, setErrorData, clearErrorData } = useErrorData();

        return (
            <form
                className={clsx(
                    "form__container",
                    functionModel.isError && "request-error",
                    functionModel.isFetching && "request-running",
                    functionModel.isPaused &&
                        functionModel.isFetching &&
                        "request-pause",
                )}
            >
                <FunctionHeading
                    id={functionModel.id}
                    isContentHide={isContentHide}
                    removeFunctionModel={removeFunctionModel}
                    setIsContentHide={setIsContentHide}
                />
                {!isContentHide && (
                    <>
                        <FunctionSetting
                            functionModel={functionModel}
                            setErrorData={setErrorData}
                            clearErrorData={clearErrorData}
                            payloadStepError={errorData.payloadStepError}
                        />
                        <FunctionData
                            setErrorData={setErrorData}
                            payloadRangeError={errorData.payloadRangeError}
                            topicError={errorData.topicError}
                            functionModel={functionModel}
                            sensorDataList={sensorDataList}
                        />
                        <ActionContainer
                            clearErrorData={clearErrorData}
                            setErrorData={setErrorData}
                            functionModel={functionModel}
                        />
                    </>
                )}
            </form>
        );
    },
);
