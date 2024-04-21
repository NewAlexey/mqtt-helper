import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";

import TextField from "@mui/material/TextField";
import { InputAdornment, InputLabel } from "@mui/material";
import { isNumber } from "src/utils/isNumber.ts";

export const PeriodicSetting = observer(
    ({ delay, onChangeDelay, isRunning }: PropsType) => {
        const delayInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
            if (!isNumber(event.target.value)) {
                return;
            }

            onChangeDelay(Number(event.target.value));
        };

        return (
            <div className="setting-item__container">
                <InputLabel id="delay">Задержка</InputLabel>
                <TextField
                    id="delay"
                    variant="outlined"
                    size="small"
                    className="setting_delay-input"
                    disabled={isRunning}
                    value={String(delay)}
                    onChange={delayInputHandler}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">ms</InputAdornment>
                        ),
                    }}
                />
            </div>
        );
    },
);

type PropsType = {
    isRunning: boolean;
    delay: number;
    onChangeDelay: (delay: number) => void;
};
