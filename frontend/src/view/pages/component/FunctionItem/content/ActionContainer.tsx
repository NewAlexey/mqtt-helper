import { observer } from "mobx-react-lite";
import React from "react";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";

import { FunctionModel } from "src/store/FunctionModel.ts";
import { ErrorDataType } from "src/view/pages/component/FunctionItem/useErrorData.ts";
import {
    ERROR_MESSAGE_ENUM,
    isTopicValid,
    PayloadRangeError,
    PayloadStepError,
    validatePayloadData,
} from "src/view/pages/component/FunctionItem/validation.ts";

export const ActionContainer = observer(
    ({ functionModel, setErrorData, clearErrorData }: PropsType) => {
        const {
            mode,
            isFetching,
            topic,
            sendRequest,
            isPaused,
            unpausePeriodicRequest,
            startPeriodicRequest,
            pausePeriodicRequest,
            stopPeriodicRequest,
            payloadStep,
            payload,
            executionMode,
        } = functionModel;

        const validateTopic = (handler: () => void) => () => {
            if (!isTopicValid(topic)) {
                setErrorData((prevValue) => ({
                    ...prevValue,
                    topicError: ERROR_MESSAGE_ENUM.TOPIC_ERROR,
                }));

                return;
            }

            handler();
        };

        const sendComplexRequestHandler = () => {
            clearErrorData();

            try {
                validatePayloadData(payload, payloadStep, executionMode);
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

                return;
            }

            startPeriodicRequest();
        };

        return (
            <div className="form-actions__container">
                {mode === "single" && (
                    <Button
                        variant="contained"
                        disabled={isFetching}
                        onClick={validateTopic(sendRequest)}
                        endIcon={<SendIcon />}
                    >
                        Отправить
                    </Button>
                )}

                {mode === "periodic" && (
                    <>
                        <Button
                            variant="contained"
                            disabled={isFetching && !isPaused}
                            onClick={
                                isPaused
                                    ? unpausePeriodicRequest
                                    : validateTopic(startPeriodicRequest)
                            }
                            endIcon={<SendIcon />}
                        >
                            Запустить
                        </Button>
                        <Button
                            variant="contained"
                            disabled={isPaused || !isFetching}
                            onClick={pausePeriodicRequest}
                            endIcon={<PauseIcon />}
                        >
                            Остановить
                        </Button>
                        <Button
                            variant="contained"
                            disabled={!isFetching}
                            onClick={stopPeriodicRequest}
                            endIcon={<StopIcon />}
                        >
                            Отменить
                        </Button>
                    </>
                )}

                {mode === "complex" && (
                    <>
                        <Button
                            variant="contained"
                            disabled={isFetching && !isPaused}
                            onClick={
                                isPaused
                                    ? unpausePeriodicRequest
                                    : validateTopic(sendComplexRequestHandler)
                            }
                            endIcon={<SendIcon />}
                        >
                            Запустить
                        </Button>
                        <Button
                            variant="contained"
                            disabled={isPaused || !isFetching}
                            onClick={pausePeriodicRequest}
                            endIcon={<PauseIcon />}
                        >
                            Остановить
                        </Button>
                        <Button
                            variant="contained"
                            disabled={!isFetching}
                            onClick={stopPeriodicRequest}
                            endIcon={<StopIcon />}
                        >
                            Отменить
                        </Button>
                    </>
                )}
            </div>
        );
    },
);

type PropsType = {
    functionModel: FunctionModel;
    clearErrorData: () => void;
    setErrorData: React.Dispatch<React.SetStateAction<ErrorDataType>>;
};
