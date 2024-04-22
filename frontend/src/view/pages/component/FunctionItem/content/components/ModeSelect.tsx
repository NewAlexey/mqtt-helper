import { observer } from "mobx-react-lite";

import { InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { FunctionMode } from "src/store/FunctionModel.ts";

const menuItemList: { value: FunctionMode; description: string }[] = [
    { value: "single", description: "Одиночный запрос" },
    { value: "periodic", description: "Периодический запрос" },
    { value: "complex", description: "Комплексный запрос" },
];

export const ModeSelect = observer(
    ({ mode, onChangeMode, isFetching, clearErrorData }: PropsType) => {
        const selectHandler = (event: SelectChangeEvent<FunctionMode>) => {
            onChangeMode(event.target.value as FunctionMode);
            clearErrorData();
        };

        return (
            <div className="setting-item__container">
                <InputLabel id="function-mode">Режим выполнения</InputLabel>
                <Select
                    size="small"
                    labelId="function-mode"
                    disabled={isFetching}
                    value={mode}
                    onChange={selectHandler}
                    className="mode_select"
                >
                    {menuItemList.map((menuItem) => (
                        <MenuItem key={menuItem.value} value={menuItem.value}>
                            {menuItem.description}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        );
    },
);

type PropsType = {
    isFetching: boolean;
    mode: FunctionMode;
    clearErrorData: () => void;
    onChangeMode: (mode: FunctionMode) => void;
};
