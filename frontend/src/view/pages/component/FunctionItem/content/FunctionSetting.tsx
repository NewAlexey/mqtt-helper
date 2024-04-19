import { observer } from "mobx-react-lite";

import { Button } from "src/shared/components/button/Button.tsx";
import { FunctionMode } from "src/store/FunctionModel.ts";

export const FunctionSetting = observer(({ onChangeMode, mode }: PropsType) => {
    return (
        <div className="form-setting__container boxed-container">
            <h4>Настройки запроса</h4>
            <div className="setting-list__container">
                <div className="mode__container">
                    <span>Режим выполнения</span>
                    <Button
                        label={getChangeModeButtonLabel(mode)}
                        className="mode-button"
                        onClick={onChangeMode}
                    />
                </div>
            </div>
        </div>
    );
});

type PropsType = {
    mode: FunctionMode;
    onChangeMode: () => void;
};

function getChangeModeButtonLabel(mode: FunctionMode): string {
    return mode === "single" ? "Одиночный запрос" : "Периодический запрос";
}
