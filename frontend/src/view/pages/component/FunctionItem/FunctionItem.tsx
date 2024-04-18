import { ChangeEvent, useState } from "react";

import { RemoveIcon } from "src/shared/components/icons/RemoveIcon.tsx";
import { Switcher } from "src/shared/components/switcher/Switcher.tsx";

import "./style.scss";
import { TextInput } from "src/shared/components/textInput/TextInput.tsx";

type FunctionItemPropsType = {
    id: string;
    removeItem: (id: string) => void;
};

export const FunctionItem = ({ id, removeItem }: FunctionItemPropsType) => {
    const [isHide, setIsHide] = useState(false);
    const [topicValue, setTopicValue] = useState("");

    const topicInputHandler = (event: ChangeEvent<HTMLInputElement>) =>
        setTopicValue(event.target.value);

    return (
        <form className="form__container">
            <div className="form-heading__container">
                <h5>Название функции для тестирования mqtt.</h5>
                <Switcher state={isHide} onClick={() => setIsHide(!isHide)} />
                <RemoveIcon
                    onClick={() => removeItem(id)}
                    className="remove-icon"
                />
            </div>
            {!isHide && (
                <div className="form__content">
                    <div className="settings__container">
                        <TextInput
                            id={id}
                            value={topicValue}
                            onChange={topicInputHandler}
                            label="Топик"
                            placeholder="Топик"
                        />
                    </div>
                </div>
            )}
        </form>
    );
};
