import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";

import TextField from "@mui/material/TextField";
import { InputAdornment, InputLabel } from "@mui/material";
import { isNotNumber } from "src/utils/isNotNumber.ts";

export const FrequencySetting = observer(
    ({ frequency, onChangeFrequency, isFetching }: PropsType) => {
        const frequencyInputHandler = (
            event: ChangeEvent<HTMLInputElement>,
        ) => {
            if (!isNotNumber(event.target.value)) {
                return;
            }

            onChangeFrequency(Number(event.target.value));
        };

        return (
            <div className="setting-item__container">
                <InputLabel id="frequency">Частота запроса</InputLabel>
                <TextField
                    id="frequency"
                    variant="outlined"
                    size="small"
                    className="frequency_input"
                    disabled={isFetching}
                    value={String(frequency)}
                    onChange={frequencyInputHandler}
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
    isFetching: boolean;
    frequency: number;
    onChangeFrequency: (frequency: number) => void;
};
