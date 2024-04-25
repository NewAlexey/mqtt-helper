import { useState } from "react";
import { observer } from "mobx-react-lite";
import { clsx } from "clsx";

import "./style.scss";

import {
    DeviceData,
    SensorData,
} from "src/model/store/FunctionModelListStore.ts";
import { FunctionModelStore } from "src/model/store/FunctionModelStore.ts";
import { FunctionHeading } from "src/view/pages/Testing/component/FunctionItem/heading/FunctionHeading.tsx";
import { FunctionData } from "src/view/pages/Testing/component/FunctionItem/content/FunctionData.tsx";
import { FunctionSetting } from "src/view/pages/Testing/component/FunctionItem/content/FunctionSetting.tsx";
import { ActionContainer } from "src/view/pages/Testing/component/FunctionItem/content/ActionContainer.tsx";
import { useErrorData } from "src/view/pages/Testing/component/FunctionItem/useErrorData.ts";

type FunctionItemPropsType = {
    sensorDataList: SensorData[];
    deviceDataList: DeviceData[];
    functionStore: FunctionModelStore;
    saveFunctionModel: (id: string) => void;
    removeFunctionModel: (id: string) => void;
};

export const FunctionItem = observer(
    ({
        functionStore,
        sensorDataList,
        deviceDataList,
        saveFunctionModel,
        removeFunctionModel,
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
                    isFunctionSave={functionStore.isSaved}
                    saveFunctionModel={saveFunctionModel}
                    isContentHide={isContentHide}
                    removeFunctionModel={removeFunctionModel}
                    setIsContentHide={setIsContentHide}
                    functionTitle={functionStore.functionData.title}
                    onChangeFunctionTitle={
                        functionStore.functionData.onChangeTitle
                    }
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
                            deviceDataList={deviceDataList}
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
