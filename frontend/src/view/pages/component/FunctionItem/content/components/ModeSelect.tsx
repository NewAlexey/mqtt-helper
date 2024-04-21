import { observer } from "mobx-react-lite";

import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { FunctionMode } from "src/store/FunctionModel.ts";

export const ModeSelect = observer(
    ({ mode, onChangeMode, isRunning }: PropsType) => {
        const selectHandler = (event: SelectChangeEvent<FunctionMode>) =>
            onChangeMode(event.target.value as FunctionMode);

        return (
            <div className="setting-item__container">
                <InputLabel id="function-mode">Режим выполнения</InputLabel>
                <Select
                    size="small"
                    labelId="function-mode"
                    disabled={isRunning}
                    value={mode}
                    onChange={selectHandler}
                    className="setting-select"
                >
                    <MenuItem value="single">Одиночный запрос</MenuItem>
                    <MenuItem value="periodic">Периодический запрос</MenuItem>
                    <MenuItem value="complex">Комплексный запрос</MenuItem>
                </Select>
            </div>
        );
    },
);

type PropsType = {
    isRunning: boolean;
    mode: FunctionMode;
    onChangeMode: (mode: FunctionMode) => void;
};
