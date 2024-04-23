import { observer } from "mobx-react-lite";
import React from "react";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import { FunctionModelStore } from "src/store/FunctionModelStore.ts";
import { ErrorDataType } from "src/view/pages/component/FunctionItem/useErrorData.ts";
import { useValidatedAction } from "src/view/pages/component/FunctionItem/content/useValidatedAction.ts";
import { DynamicActionList } from "src/view/pages/component/FunctionItem/content/components/actions/DynamicActionList.tsx";

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
            functionData,
        } = functionStore;

        const {
            singleRequestHandler,
            periodicRequestHandler,
            complexRequestHandler,
        } = useValidatedAction({
            setErrorData,
            sendSingleRequest,
            startPeriodicRequest,
            startComplexRequest,
            topic: functionData.topic,
            payload: functionData.payload,
            payloadStep: functionData.payloadStep,
            executionMode: functionData.executionMode,
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
                    <DynamicActionList
                        isPaused={isPaused}
                        isFetching={isFetching}
                        stopRequest={stopRequest}
                        pauseRequest={pauseRequest}
                        unpauseRequest={unpauseRequest}
                        startDynamicRequest={periodicRequestHandler}
                    />
                )}

                {functionData.mode === "complex" && (
                    <DynamicActionList
                        isPaused={isPaused}
                        isFetching={isFetching}
                        stopRequest={stopRequest}
                        pauseRequest={pauseRequest}
                        unpauseRequest={unpauseRequest}
                        startDynamicRequest={complexRequestHandler}
                    />
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
