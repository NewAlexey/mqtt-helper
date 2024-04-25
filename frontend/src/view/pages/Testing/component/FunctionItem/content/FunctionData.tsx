import { observer } from "mobx-react-lite";
import React from "react";

import Typography from "@mui/material/Typography";

import "./style.scss";

import { FunctionModelStore } from "src/model/store/FunctionModelStore.ts";
import {
    DeviceData,
    SensorData,
} from "src/model/store/FunctionModelListStore.ts";
import { ComplexPayload } from "src/view/pages/Testing/component/FunctionItem/content/components/data/ComplexPayload.tsx";
import { ConstantPayload } from "src/view/pages/Testing/component/FunctionItem/content/components/data/ConstantPayload.tsx";
import { TopicData } from "src/view/pages/Testing/component/FunctionItem/content/components/data/TopicData.tsx";
import { ErrorDataType } from "src/view/pages/Testing/component/FunctionItem/useErrorData.ts";

export const FunctionData = observer(
    ({
        topicError,
        functionStore,
        sensorDataList,
        deviceDataList,
        setErrorData,
        payloadRangeError,
    }: PropsType) => {
        const { isFetching, functionData } = functionStore;
        const {
            id,
            mode,
            topic,
            onChangeTopic,
            payload,
            onChangePayload,
            onChangeRangePayload,
        } = functionData;

        return (
            <div className="form-data__container boxed-container">
                <Typography
                    variant="h4"
                    fontSize={18}
                    fontWeight={500}
                    align="left"
                >
                    Данные запроса
                </Typography>
                <div className="function-data__container">
                    <TopicData
                        id={id}
                        topicError={topicError}
                        topic={topic}
                        setErrorData={setErrorData}
                        sensorDataList={sensorDataList}
                        deviceDataList={deviceDataList}
                        isFetching={isFetching}
                        onChangeTopic={onChangeTopic}
                    />

                    {mode === "complex" && (
                        <ComplexPayload
                            id={id}
                            isFetching={isFetching}
                            onChangeRangePayload={onChangeRangePayload}
                            payloadRangeError={payloadRangeError}
                            setErrorData={setErrorData}
                            payloadTo={payload.payloadTo}
                            payloadFrom={payload.payloadFrom}
                        />
                    )}

                    {(mode === "single" || mode === "periodic") && (
                        <ConstantPayload
                            id={id}
                            onChangePayload={onChangePayload}
                            payloadConst={payload.payloadConst}
                        />
                    )}

                    {payloadRangeError || topicError ? (
                        <Typography className="payload-step_error color_error">
                            {payloadRangeError || topicError}
                        </Typography>
                    ) : null}
                </div>
            </div>
        );
    },
);

type PropsType = {
    topicError: string;
    payloadRangeError: string;
    sensorDataList: SensorData[];
    deviceDataList: DeviceData[];
    functionStore: FunctionModelStore;
    setErrorData: React.Dispatch<React.SetStateAction<ErrorDataType>>;
};
