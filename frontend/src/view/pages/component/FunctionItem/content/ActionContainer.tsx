import { observer } from "mobx-react-lite";
import React from "react";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";

import { FunctionModelStore } from "src/store/FunctionModelStore.ts";
import { ErrorDataType } from "src/view/pages/component/FunctionItem/useErrorData.ts";
import { useValidatedAction } from "src/view/pages/component/FunctionItem/content/useValidatedAction.ts";

export const ActionContainer = observer(
    ({ functionStore, setErrorData }: PropsType) => {
        const {
            isFetching,
            sendSingleRequest,
            isPaused,
            unpauseRequest,
            startPeriodicRequest,
            pauseRequest,
            stopRequest,
            startComplexRequest,
            executionMode,
            functionData,
        } = functionStore;

        const {
            singleRequestHandler,
            periodicRequestHandler,
            complexRequestHandler,
        } = useValidatedAction({
            executionMode,
            setErrorData,
            sendSingleRequest,
            startPeriodicRequest,
            startComplexRequest,
            topic: functionData.topic,
            payload: functionData.payload,
            payloadStep: functionData.payloadStep,
        });

        return (
            <div className="form-actions__container">
                {functionData.mode === "single" && (
                    <Button
                        variant="contained"
                        disabled={isFetching}
                        onClick={singleRequestHandler}
                        endIcon={<SendIcon />}
                    >
                        Отправить
                    </Button>
                )}

                {functionData.mode === "periodic" && (
                    <>
                        <Button
                            variant="contained"
                            disabled={isFetching && !isPaused}
                            onClick={
                                isPaused
                                    ? unpauseRequest
                                    : periodicRequestHandler
                            }
                            endIcon={<SendIcon />}
                        >
                            Запустить
                        </Button>
                        <Button
                            variant="contained"
                            disabled={isPaused || !isFetching}
                            onClick={pauseRequest}
                            endIcon={<PauseIcon />}
                        >
                            Остановить
                        </Button>
                        <Button
                            variant="contained"
                            disabled={!isFetching}
                            onClick={stopRequest}
                            endIcon={<StopIcon />}
                        >
                            Отменить
                        </Button>
                    </>
                )}

                {functionData.mode === "complex" && (
                    <>
                        <Button
                            variant="contained"
                            disabled={isFetching && !isPaused}
                            onClick={
                                isPaused
                                    ? unpauseRequest
                                    : complexRequestHandler
                            }
                            endIcon={<SendIcon />}
                        >
                            Запустить
                        </Button>
                        <Button
                            variant="contained"
                            disabled={isPaused || !isFetching}
                            onClick={pauseRequest}
                            endIcon={<PauseIcon />}
                        >
                            Остановить
                        </Button>
                        <Button
                            variant="contained"
                            disabled={!isFetching}
                            onClick={stopRequest}
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
    functionStore: FunctionModelStore;
    clearErrorData: () => void;
    setErrorData: React.Dispatch<React.SetStateAction<ErrorDataType>>;
};
