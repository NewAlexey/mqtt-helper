import { observer } from "mobx-react-lite";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";

import { FunctionMode } from "src/store/FunctionModel.ts";

export const ActionContainer = observer(
    ({
        mode,
        isPaused,
        isRunning,
        sendRequest,
        startPeriodicRequest,
        stopPeriodicRequest,
        pausePeriodicRequest,
        unpausePeriodicRequest,
    }: PropsType) => {
        return (
            <div className="form-actions__container">
                {mode === "single" && (
                    <Button
                        variant="contained"
                        disabled={isRunning}
                        onClick={sendRequest}
                        endIcon={<SendIcon />}
                    >
                        Отправить
                    </Button>
                )}

                {mode === "periodic" && (
                    <>
                        <Button
                            variant="contained"
                            disabled={isRunning && !isPaused}
                            onClick={
                                isPaused
                                    ? unpausePeriodicRequest
                                    : startPeriodicRequest
                            }
                            endIcon={<SendIcon />}
                        >
                            Запустить
                        </Button>
                        <Button
                            variant="contained"
                            disabled={isPaused || !isRunning}
                            onClick={pausePeriodicRequest}
                            endIcon={<PauseIcon />}
                        >
                            Остановить
                        </Button>
                        <Button
                            variant="contained"
                            disabled={!isRunning}
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
                            disabled={isRunning && !isPaused}
                            onClick={
                                isPaused
                                    ? unpausePeriodicRequest
                                    : startPeriodicRequest
                            }
                            endIcon={<SendIcon />}
                        >
                            Запустить
                        </Button>
                        <Button
                            variant="contained"
                            disabled={isPaused || !isRunning}
                            onClick={pausePeriodicRequest}
                            endIcon={<PauseIcon />}
                        >
                            Остановить
                        </Button>
                        <Button
                            variant="contained"
                            disabled={!isRunning}
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
    mode: FunctionMode;
    isPaused: boolean;
    isRunning: boolean;
    sendRequest: () => void;
    startPeriodicRequest: () => void;
    pausePeriodicRequest: () => void;
    stopPeriodicRequest: () => void;
    unpausePeriodicRequest: () => void;
};
