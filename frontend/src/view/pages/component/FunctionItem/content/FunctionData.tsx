import { observer } from "mobx-react-lite";
import React from "react";

import Typography from "@mui/material/Typography";

import "./style.scss";

import { FunctionModel } from "src/store/FunctionModel.ts";
import { SensorData } from "src/store/FunctionModelListStore.ts";
import { ComplexPayload } from "src/view/pages/component/FunctionItem/content/components/data/ComplexPayload.tsx";
import { ConstantPayload } from "src/view/pages/component/FunctionItem/content/components/data/ConstantPayload.tsx";
import { TopicData } from "src/view/pages/component/FunctionItem/content/components/data/TopicData.tsx";
import { ErrorDataType } from "src/view/pages/component/FunctionItem/useErrorData.ts";

export const FunctionData = observer(
    ({
        functionModel,
        sensorDataList,
        setErrorData,
        payloadRangeError,
    }: PropsType) => {
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
                        id={functionModel.id}
                        topic={functionModel.topic}
                        sensorDataList={sensorDataList}
                        isFetching={functionModel.isFetching}
                        onChangeTopic={functionModel.onChangeTopic}
                    />

                    {functionModel.mode === "complex" && (
                        <ComplexPayload
                            id={functionModel.id}
                            isFetching={functionModel.isFetching}
                            onChangeRangePayload={
                                functionModel.onChangeRangePayload
                            }
                            payloadRangeError={payloadRangeError}
                            setErrorData={setErrorData}
                            payloadTo={functionModel.payload.payloadTo}
                            payloadFrom={functionModel.payload.payloadFrom}
                        />
                    )}

                    {(functionModel.mode === "single" ||
                        functionModel.mode === "periodic") && (
                        <ConstantPayload
                            id={functionModel.id}
                            onChangePayload={functionModel.onChangePayload}
                            payloadConst={functionModel.payload.payloadConst}
                        />
                    )}

                    {payloadRangeError ? (
                        <Typography className="payload-step_error color_error">
                            {payloadRangeError}
                        </Typography>
                    ) : null}
                </div>
            </div>
        );
    },
);

type PropsType = {
    payloadRangeError: string;
    sensorDataList: SensorData[];
    functionModel: FunctionModel;
    setErrorData: React.Dispatch<React.SetStateAction<ErrorDataType>>;
};
