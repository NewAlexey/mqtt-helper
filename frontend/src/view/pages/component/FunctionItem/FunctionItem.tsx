import { useState } from "react";
import { observer } from "mobx-react-lite";
import { clsx } from "clsx";

import "./style.scss";

import { FunctionModelStore } from "src/store/FunctionModelStore.ts";
import { FunctionHeading } from "src/view/pages/component/FunctionItem/heading/FunctionHeading.tsx";
import { FunctionData } from "src/view/pages/component/FunctionItem/content/FunctionData.tsx";
import { FunctionSetting } from "src/view/pages/component/FunctionItem/content/FunctionSetting.tsx";
import { ActionContainer } from "src/view/pages/component/FunctionItem/content/ActionContainer.tsx";
import { SensorData } from "src/store/FunctionModelListStore.ts";
import { useErrorData } from "src/view/pages/component/FunctionItem/useErrorData.ts";

type FunctionItemPropsType = {
    sensorDataList: SensorData[];
    functionStore: FunctionModelStore;
    removeFunctionModel: (id: string) => void;
};

export const FunctionItem = observer(
    ({
        functionStore,
        removeFunctionModel,
        sensorDataList,
    }: FunctionItemPropsType) => {
        const [isContentHide, setIsContentHide] = useState(false);
        const { errorData, setErrorData, clearErrorData } = useErrorData();

        return (
            <form
                className={clsx(
                    "form__container",
                    functionStore.isFetching && "request-running",
                    functionStore.isPaused &&
                        functionStore.isFetching &&
                        "request-pause",
                    functionStore.isError && "request-error",
                )}
            >
                <FunctionHeading
                    id={functionStore.functionData.id}
                    isContentHide={isContentHide}
                    removeFunctionModel={removeFunctionModel}
                    setIsContentHide={setIsContentHide}
                />
                {!isContentHide && (
                    <>
                        <FunctionSetting
                            functionStore={functionStore}
                            setErrorData={setErrorData}
                            clearErrorData={clearErrorData}
                            payloadStepError={errorData.payloadStepError}
                        />
                        <FunctionData
                            setErrorData={setErrorData}
                            payloadRangeError={errorData.payloadRangeError}
                            topicError={errorData.topicError}
                            functionStore={functionStore}
                            sensorDataList={sensorDataList}
                        />
                        <ActionContainer
                            clearErrorData={clearErrorData}
                            setErrorData={setErrorData}
                            functionStore={functionStore}
                        />
                    </>
                )}
            </form>
        );
    },
);
