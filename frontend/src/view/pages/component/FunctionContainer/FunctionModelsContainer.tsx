import { observer } from "mobx-react-lite";

import "./style.scss";

import { FunctionItem } from "src/view/pages/component/FunctionItem/FunctionItem.tsx";
import { Button } from "src/shared/components/button/Button.tsx";
import { FunctionModelListStore } from "src/store/FunctionModelListStore.ts";

const FunctionModelsStore = new FunctionModelListStore();

export const FunctionModelsContainer = observer(() => {
    return (
        <div className="functions__container">
            <h2>Список функций</h2>
            <Button
                label="Добавить функцию"
                className="right-alignment"
                onClick={() => FunctionModelsStore.addNewModel()}
            />
            <div className="functions__content">
                {FunctionModelsStore.modelList.map((functionModel) => (
                    <FunctionItem
                        key={functionModel.id}
                        functionModel={functionModel}
                        removeFunctionModel={FunctionModelsStore.removeModel}
                    />
                ))}
            </div>
        </div>
    );
});
