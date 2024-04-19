import { observer } from "mobx-react-lite";

import { FunctionMode } from "src/store/FunctionModel.ts";
import { PlayIcon } from "src/shared/components/icons/PlayIcon.tsx";
import { ActionButton } from "src/view/pages/component/FunctionItem/content/actions/ActionButton.tsx";
import { PauseIcon } from "src/shared/components/icons/PauseIcon.tsx";
import { StopIcon } from "src/shared/components/icons/StopIcon.tsx";

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
                {mode === "single" ? (
                    <ActionButton
                        label="Отправить"
                        disabled={isRunning}
                        className="action-button"
                        onClick={sendRequest}
                        icon={<PlayIcon className="action-icon" />}
                    />
                ) : (
                    <>
                        <ActionButton
                            label="Запустить"
                            disabled={isRunning && !isPaused}
                            className="action-button"
                            onClick={
                                isPaused
                                    ? unpausePeriodicRequest
                                    : startPeriodicRequest
                            }
                            icon={<PlayIcon className="action-icon" />}
                        />
                        <ActionButton
                            label="Остановить"
                            disabled={isPaused || !isRunning}
                            className="action-button"
                            onClick={pausePeriodicRequest}
                            icon={<PauseIcon className="action-icon" />}
                        />
                        <ActionButton
                            label="Отменить"
                            disabled={!isRunning}
                            className="action-button"
                            onClick={stopPeriodicRequest}
                            icon={<StopIcon className="action-icon" />}
                        />
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
