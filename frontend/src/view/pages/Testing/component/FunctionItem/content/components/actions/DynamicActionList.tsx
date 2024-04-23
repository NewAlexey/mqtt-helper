import { observer } from "mobx-react-lite";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";

export const DynamicActionList = observer(
    ({
        isPaused,
        startDynamicRequest,
        stopRequest,
        unpauseRequest,
        pauseRequest,
        isFetching,
    }: PropsType) => {
        return (
            <>
                <Button
                    variant="contained"
                    disabled={isFetching && !isPaused}
                    onClick={isPaused ? unpauseRequest : startDynamicRequest}
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
        );
    },
);

type PropsType = {
    isFetching: boolean;
    isPaused: boolean;
    stopRequest: () => void;
    pauseRequest: () => void;
    unpauseRequest: () => void;
    startDynamicRequest: () => void;
};
