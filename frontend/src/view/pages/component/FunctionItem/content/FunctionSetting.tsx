import { observer } from "mobx-react-lite";

import Typography from "@mui/material/Typography";

import { FunctionMode } from "src/store/FunctionModel.ts";
import { ModeSelect } from "src/view/pages/component/FunctionItem/content/components/ModeSelect.tsx";
import { PeriodicSetting } from "src/view/pages/component/FunctionItem/content/components/PeriodicSetting.tsx";

export const FunctionSetting = observer(
    ({ delay, onChangeMode, onChangeDelay, mode, isRunning }: PropsType) => {
        return (
            <div className="form-setting__container boxed-container">
                <Typography
                    variant="h4"
                    fontSize={18}
                    fontWeight={500}
                    align="left"
                >
                    Настройки запроса
                </Typography>
                <div className="setting-list__container">
                    <ModeSelect
                        mode={mode}
                        onChangeMode={onChangeMode}
                        isRunning={isRunning}
                    />
                    {mode === "periodic" && (
                        <PeriodicSetting
                            delay={delay}
                            isRunning={isRunning}
                            onChangeDelay={onChangeDelay}
                        />
                    )}
                </div>
            </div>
        );
    },
);

type PropsType = {
    mode: FunctionMode;
    delay: number;
    isRunning: boolean;
    onChangeMode: (mode: FunctionMode) => void;
    onChangeDelay: (delay: number) => void;
};
