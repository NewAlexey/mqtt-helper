import React from "react";

import {
    FunctionExecutionMode,
    FunctionPayloadType,
} from "src/store/FunctionModel.ts";
import { ErrorDataType } from "src/view/pages/component/FunctionItem/useErrorData.ts";
import {
    PayloadRangeError,
    PayloadStepError,
    validatePayloadData,
    validateTopic,
} from "src/view/pages/component/FunctionItem/content/validation.ts";

export const useValidatedAction = ({
    topic,
    payload,
    payloadStep,
    executionMode,
    setErrorData,
    sendRequest,
    startPeriodicRequest,
}: PropsType) => {
    const sendSingleRequest = () =>
        validateTopic(topic, setErrorData, sendRequest);

    const sendPeriodicRequest = () =>
        validateTopic(topic, setErrorData, startPeriodicRequest);

    const sendComplexRequest = () => {
        const sendComplexRequestHandler = () => {
            try {
                validatePayloadData(
                    payload,
                    Number(payloadStep),
                    executionMode,
                );
                startPeriodicRequest();
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

    return { sendSingleRequest, sendPeriodicRequest, sendComplexRequest };
};

type PropsType = {
    topic: string;
    payload: FunctionPayloadType;
    payloadStep: string;
    setErrorData: React.Dispatch<React.SetStateAction<ErrorDataType>>;
    executionMode: FunctionExecutionMode;
    sendRequest: () => void;
    startPeriodicRequest: () => void;
};
