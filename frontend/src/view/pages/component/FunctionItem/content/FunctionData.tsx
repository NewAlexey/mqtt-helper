import { ChangeEvent } from "react";
import { observer } from "mobx-react-lite";

import "./style.scss";

import { TextInput } from "src/shared/components/textInput/TextInput.tsx";
import { FunctionModel } from "src/store/FunctionModel.ts";

export const FunctionData = observer(({ functionModel }: PropsType) => {
    const topicInputHandler = (event: ChangeEvent<HTMLInputElement>) =>
        functionModel.onChangeTopic(event.target.value);

    const payloadInputHandler = (event: ChangeEvent<HTMLInputElement>) =>
        functionModel.onChangePayload(event.target.value);

    return (
        <div className="form-data__container boxed-container">
            <h4>Данные запроса</h4>
            <div className="function-data__container">
                <TextInput
                    id={`${functionModel.id}_topic`}
                    value={functionModel.topic}
                    onChange={topicInputHandler}
                    label="Топик"
                    placeholder="Топик"
                />
                <TextInput
                    id={`${functionModel.id}_payload`}
                    value={functionModel.payload}
                    onChange={payloadInputHandler}
                    label="Payload"
                    placeholder="Payload"
                />
            </div>
        </div>
    );
});

type PropsType = {
    functionModel: FunctionModel;
};
