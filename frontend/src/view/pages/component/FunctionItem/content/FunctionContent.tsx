import { ChangeEvent } from "react";
import { observer } from "mobx-react-lite";

import { TextInput } from "src/shared/components/textInput/TextInput.tsx";
import { FunctionModel } from "src/store/FunctionModel.ts";

export const FunctionContent = observer(({ functionModel }: PropsType) => {
    const topicInputHandler = (event: ChangeEvent<HTMLInputElement>) =>
        functionModel.onChangeTopic(event.target.value);

    return (
        <div className="form__content">
            <div className="settings__container">
                <TextInput
                    id={functionModel.id}
                    value={functionModel.topic}
                    onChange={topicInputHandler}
                    label="Топик"
                    placeholder="Топик"
                />
            </div>
        </div>
    );
});

type PropsType = {
    functionModel: FunctionModel;
};
