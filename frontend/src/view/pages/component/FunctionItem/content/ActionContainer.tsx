import { observer } from "mobx-react-lite";

import { FunctionMode } from "src/store/FunctionModel.ts";
import { PlayIcon } from "src/shared/components/icons/PlayIcon.tsx";
import { Button } from "src/shared/components/button/Button.tsx";

export const ActionContainer = observer(({ mode, sendRequest }: PropsType) => {
    return (
        <div className="form-actions__container">
            {mode === "single" ? (
                <Button
                    label="Отправить"
                    className="button-start"
                    onClick={sendRequest}
                    icon={<PlayIcon className="start-icon" />}
                />
            ) : null}
        </div>
    );
});

type PropsType = {
    mode: FunctionMode;
    sendRequest: () => void;
};
