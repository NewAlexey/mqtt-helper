import React from "react";

import { ErrorDataType } from "src/view/pages/component/FunctionItem/useErrorData.ts";
import {
    PayloadRangeError,
    PayloadStepError,
    validatePayloadData,
    validateTopic,
} from "src/view/pages/component/FunctionItem/content/validation.ts";
import { FunctionExecutionMode } from "src/store/request/ComplexRequest.ts";
import { FunctionPayloadType } from "src/model/FunctionModel.ts";

export const useValidatedAction = ({
    topic,
    payload,
    payloadStep,
    executionMode,
    setErrorData,
    sendSingleRequest,
    startPeriodicRequest,
    startComplexRequest,
}: PropsType) => {
    const singleRequestHandler = () =>
        validateTopic(topic, setErrorData, sendSingleRequest);

    const periodicRequestHandler = () =>
        validateTopic(topic, setErrorData, startPeriodicRequest);

    const complexRequestHandler = () => {
        const sendComplexRequestHandler = () => {
            try {
                validatePayloadData(
                    payload,
                    Number(payloadStep),
                    executionMode,
                );
                startComplexRequest();
            } catch (error) {
                if (error instanceof PayloadStepError) {
                    setErrorData((prevValue) => ({
                        ...prevValue,
                        payloadStepError: (error as PayloadStepError).message,
                    }));
                }

                if (error instanceof PayloadRangeError) {
                    setErrorData((prevValue) => ({
                        ...prevValue,
                        payloadRangeError: (error as PayloadRangeError).message,
                    }));
                }
            }
        };

        validateTopic(topic, setErrorData, sendComplexRequestHandler);
    };

    return {
        singleRequestHandler,
        periodicRequestHandler,
        complexRequestHandler,
    };
};

type PropsType = {
    topic: string;
    payload: FunctionPayloadType;
    payloadStep: string;
    setErrorData: React.Dispatch<React.SetStateAction<ErrorDataType>>;
    executionMode: FunctionExecutionMode;
    sendSingleRequest: () => void;
    startComplexRequest: () => void;
    startPeriodicRequest: () => void;
};
